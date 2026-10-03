def test_create_product(auth_client):
    resp = auth_client.post("/products", json={
        "sku": "SKU-001",
        "name": "Widget",
        "unit": "PCS",
        "selling_price": 100.0,
    })
    assert resp.status_code == 201
    assert resp.json()["sku"] == "SKU-001"


def test_list_products(auth_client):
    auth_client.post("/products", json={"sku": "SKU-A", "name": "A"})
    auth_client.post("/products", json={"sku": "SKU-B", "name": "B"})
    resp = auth_client.get("/products")
    assert resp.status_code == 200
    assert len(resp.json()) == 2


def test_get_product(auth_client):
    create = auth_client.post("/products", json={"sku": "SKU-G", "name": "Get Me"})
    pid = create.json()["id"]
    resp = auth_client.get(f"/products/{pid}")
    assert resp.status_code == 200
    assert resp.json()["name"] == "Get Me"


def test_update_product(auth_client):
    create = auth_client.post("/products", json={"sku": "SKU-U", "name": "Old"})
    pid = create.json()["id"]
    resp = auth_client.patch(f"/products/{pid}", json={"name": "New"})
    assert resp.status_code == 200
    assert resp.json()["name"] == "New"


def test_delete_product(auth_client):
    create = auth_client.post("/products", json={"sku": "SKU-D", "name": "Delete Me"})
    pid = create.json()["id"]
    resp = auth_client.delete(f"/products/{pid}")
    assert resp.status_code == 204
    resp = auth_client.get(f"/products/{pid}")
    assert resp.status_code == 404


def test_duplicate_sku(auth_client):
    auth_client.post("/products", json={"sku": "DUP", "name": "First"})
    resp = auth_client.post("/products", json={"sku": "DUP", "name": "Second"})
    assert resp.status_code == 409
