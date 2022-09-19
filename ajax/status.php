<?php
include ('../../../inc/includes.php');

header("Content-Type: application/json; charset=UTF-8", true);

$plugin = new Plugin();
if (!$plugin->isActivated('stab')) {
    Html::displayNotFoundError();
}

Html::header_nocache();

Session::checkLoginUser();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    // Bad request method
    die(405);
}

if (!isset($_GET['itemtype'], $_GET['items_id'])) {
    // Bad request
    die(400);
}

$itemtype = $_GET['itemtype'];
if (!is_subclass_of($itemtype, CommonITILObject::class)) {
    die(400);
}
$items_id = $_GET['items_id'];

// Get allowed statuses
$item = new $itemtype();
if ($item->getFromDB($items_id) === false) {
    die(400);
}
$allowed = $itemtype::getAllowedStatusArray($item->fields['status']);
$allowed_statuses = [];
foreach ($allowed as $status_id => $status) {
    $allowed_statuses[] = [
        'value' => $status_id,
        'label' => $status,
        'icon_class' => $itemtype::getStatusClass($status_id),
    ];
}

try {
    echo json_encode([
        'current_status' => $item->fields['status'],
        'allowed_statuses' => $allowed_statuses,
    ], JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    die(500);
}
