
<?php
function GetRequestMethod() {
    return $_SERVER['REQUEST_METHOD'];
}

function HandleGet() {
    $action = $_GET['action'] ?? 'default';
    
    switch ($action) {
        case 'status':
            $db = GetDbConnection();
            $free = SlotIsFree($db);
            CloseDbConnection($db);
            SendJsonResponse([
                'result' => 'ok',
                'status' => $free ? 'slot disponibili' : 'slot esauriti'
            ]);
            break;

        case 'default':
        default:
            SendJsonResponse([
                'result' => 'ok',
                'message' => 'Server attivo'
            ]);
            break;
    }
}

function HandlePost() {
    $payload = GetPostJson();

    if ($payload === null) {
        SendJsonResponse(['result' => 'error', 'message' => 'Nessun dato ricevuto'], 400);
    }

    $msg_type = $payload['msg_type'] ?? 'sconosciuto';

	SendJsonResponse(['result' => $payload, 'risposta' => GetRisposta($payload), 'id' => $mio_id]);
        /*
    switch ($msg_type) {
        case 'test_messaggio':
            SendJsonResponse([
                'result'   => 'ok',
                'msg_type' => $msg_type,
                'data'     => $payload
            ]);
            break;

        case 'registra_postazione':
            $db = GetDbConnection();
            try {
                if (!SlotIsFree($db)) {
                    SendJsonResponse(['result' => 'error', 'message' => 'Nessuno slot disponibile'], 503);
                }
                $mio_id = LockSlot($db);
                SendJsonResponse(['result' => 'ok', 'id' => $mio_id]);
            } finally {
                CloseDbConnection($db);
            }
            break;

        default:
            SendJsonResponse([
                'result'   => 'error',
                'message'  => 'msg_type sconosciuto: ' . $msg_type
            ], 400);
            break;
    }
    */
}

try {
    switch (GetRequestMethod()) {
        case 'GET':
            HandleGet();
            break;
        case 'POST':
            HandlePost();
            break;
        default:
            SendJsonResponse(['result' => 'error', 'message' => 'Metodo non supportato'], 405);
            break;
    }
} catch (RuntimeException $e) {
    SendJsonResponse(['result' => 'error', 'message' => $e->getMessage()], 500);
}
try {
    $db      = GetDbConnection();
    $payload = GetPostJson();

    if ($payload === null) {
        SendJsonResponse(['result' => 'error', 'message' => 'Nessun dato ricevuto'], 400);
    }

    if (!SlotIsFree($db)) {
        SendJsonResponse(['result' => 'error', 'message' => 'Nessuno slot disponibile'], 503);
    }

    $mio_id = LockSlot($db);
    try {

        SendJsonResponse(['result' => $payload, 'risposta' => GetRisposta($payload), 'id' => $mio_id]);
        //SendJsonResponse(['result' => 'ok', 'risposta' => 'ok_risposta', 'id' => $mio_id]);
    } finally {
        UnLockSlot($db, $mio_id);
        CloseDbConnection($db);  // chiusura garantita anche in caso di errore
    }

} catch (RuntimeException $e) {
    CloseDbConnection($db);
    SendJsonResponse(['result' => 'error', 'message' => $e->getMessage()], 500);
}

function GetRisposta($payload) {
	switch ($payload["msg_type"]) {
		case "test_message":
			$result = [
				"result_type" => "test_result",
				"result_content" => "result successfull ".$payload["msg_content"]["numero_iterazioni"]
			];
			break;
		default:
			$result = [
				"result_type" => "not_found",
				"result_content" => $payload["msg_type"]
			];
	} 
	return $result;
}

function SendJsonResponse($data, $status_code = 200) {
    http_response_code($status_code);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *'); // stesso header CORS che usi in YAWS
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function GetPostJson() {
    $raw = file_get_contents('php://input');
    
    if (empty($raw)) {
        return null;
    }

    $data = json_decode($raw, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new RuntimeException('JSON non valido: ' . json_last_error_msg());
    }

    return $data;
}

function GetDbConnection() {
    $host     = 'localhost';
    $dbname   = 'gestione_test';
    $user     = 'server_user';
    $password = 'my_password';
    $charset  = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $db = new PDO($dsn, $user, $password, $options);
        return $db;
    } catch (PDOException $e) {
        throw new RuntimeException('Errore connessione DB: ' . $e->getMessage());
    }
}

function CloseDbConnection(&$db) {
    $db = null;
}

function GetMaxSlots() {
  return 10;
}   
    
function SlotIsFree($db) {
  // Pulizia automatica (probabilita' 5% per ogni chiamata)
  if (rand(1, 100) <= 5) {
    // Elimina i record piu' vecchi di 1 minuto (processi probabilmente crashati)
    $db->query("DELETE FROM processi_attivi
     WHERE data_inizio < NOW() - INTERVAL 1 MINUTE");
  }
  $max_slots = GetMaxSlots();
  $count = $db->query("SELECT COUNT(*) FROM processi_attivi")->fetchColumn();
  
  if ($count > $max_slots) {
    return false;
  }
  return true;
}

function LockSlot($db) {
  $token = bin2hex(random_bytes(16)); // Generiamo un ID unico per questa esecuzione

  // 1. Inseriamo il record per tentare di occupare uno slot
  $stmt = $db->prepare("INSERT INTO processi_attivi (token_univoco) VALUES (?)");
  $stmt->execute([$token]);
  $mio_id = $db->lastInsertId();
  
  return $mio_id;   
}   

function UnLockSlot($db, $mio_id) {
  if (isset($mio_id)) {
    $db->prepare("DELETE FROM processi_attivi WHERE id = ?")->execute([$mio_id]);
  }
}   


?>
