def _setup(auth_client):
    p = auth_client.post("/products", json={"sku": "SO-P", "name": "SO Item", "selling_price": 100}).json()
    w = auth_client.post("/warehouses", json={"name": "SO Warehouse"}).json()
    c = auth_client.post("/customers", json={"name": "Test Customer"}).json()
    auth_client.post("/stock", json={"product_id": p["id"], "warehouse_id": w["id"], "quantity": 50})
    return p["id"], w["id"], c["id"]


def test_create_sales_order(auth_client):
    pid, wid, cid = _setup(auth_client)
    resp = auth_client.post("/sales-orders", json={
        "customer_id": cid,
        "warehouse_id": wid,
        "items": [{"product_id": pid, "quantity": 5, "unit_price": 100}],
    })
    assert resp.status_code == 201
    data = resp.json()
    assert data["order_number"].startswith("SO-")
    assert data["total_amount"] == 500


def test_ship_order(auth_client):
    pid, wid, cid = _setup(auth_client)
    so = auth_client.post("/sales-orders", json={
        "customer_id": cid,
        "warehouse_id": wid,
        "items": [{"product_id": pid, "quantity": 5, "unit_price": 100}],
    }).json()

    resp = auth_client.post(f"/sales-orders/{so['id']}/ship")
    assert resp.status_code == 200
    assert resp.json()["status"] == "shipped"

    stock = auth_client.get("/stock", params={"product_id": pid}).json()
    assert stock[0]["quantity"] == 45
