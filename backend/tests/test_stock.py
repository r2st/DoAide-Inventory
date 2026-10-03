def _setup(auth_client):
    p = auth_client.post("/products", json={"sku": "STK-1", "name": "Stock Item"}).json()
    w = auth_client.post("/warehouses", json={"name": "Main Warehouse"}).json()
    return p["id"], w["id"]


def test_create_stock_level(auth_client):
    pid, wid = _setup(auth_client)
    resp = auth_client.post("/stock", json={
        "product_id": pid, "warehouse_id": wid, "quantity": 100, "min_level": 10, "reorder_point": 20,
    })
    assert resp.status_code == 201
    assert resp.json()["quantity"] == 100


def test_update_stock_level(auth_client):
    pid, wid = _setup(auth_client)
    create = auth_client.post("/stock", json={"product_id": pid, "warehouse_id": wid, "quantity": 50})
    sid = create.json()["id"]
    resp = auth_client.patch(f"/stock/{sid}", json={"quantity": 75})
    assert resp.status_code == 200
    assert resp.json()["quantity"] == 75


def test_stock_alerts(auth_client):
    pid, wid = _setup(auth_client)
    auth_client.post("/stock", json={
        "product_id": pid, "warehouse_id": wid, "quantity": 5, "reorder_point": 10,
    })
    resp = auth_client.get("/stock/alerts")
    assert resp.status_code == 200
    alerts = resp.json()
    assert len(alerts) == 1
    assert alerts[0]["current_quantity"] == 5
