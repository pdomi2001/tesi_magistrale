
<?php

$db = GetDbConnection();

if (SlotIsFree($db)) {
    $mio_id = LockSlot($db);
    try {
		print("codice da eseguire");
    } finally {
        UnLockSlot($db, $mio_id);
    }
} else {
    echo "Nessuno slot disponibile.";
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
