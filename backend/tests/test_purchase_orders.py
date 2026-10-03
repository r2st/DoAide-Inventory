def _setup(auth_client):
    p = auth_client.post("/products", json={"sku": "PO-P", "name": "PO Item", "purchase_price": 50}).json()
    w = auth_client.post("/warehouses", json={"name": "PO Warehouse"}).json()
    s = auth_client.post("/suppliers", json={"name": "Test Supplier"}).json()
    return p["id"], w["id"], s["id"]


def test_create_purchase_order(auth_client):
    pid, wid, sid = _setup(auth_client)
    resp = auth_client.post("/purchase-orders", json={
        "supplier_id": sid,
        "warehouse_id": wid,
        "items": [{"product_id": pid, "quantity": 10, "unit_price": 50}],
    })
    assert resp.status_code == 201
    data = resp.json()
    assert data["order_number"].startswith("PO-")
    assert data["total_amount"] == 500
    assert len(data["items"]) == 1


def test_receive_items(auth_client):
    pid, wid, sid = _setup(auth_client)
    po = auth_client.post("/purchase-orders", json={
        "supplier_id": sid,
        "warehouse_id": wid,
        "items": [{"product_id": pid, "quantity": 10, "unit_price": 50}],
    }).json()
    item_id = po["items"][0]["id"]

    resp = auth_client.post(f"/purchase-orders/{po['id']}/receive", json=[
        {"item_id": item_id, "quantity": 10},
    ])
    assert resp.status_code == 200
    assert resp.json()["status"] == "received"

    stock = auth_client.get("/stock", params={"product_id": pid}).json()
    assert stock[0]["quantity"] == 10
