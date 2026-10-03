def test_register(client):
    resp = client.post("/auth/register", json={
        "email": "new@example.com",
        "password": "Pass123!",
        "full_name": "New User",
        "business_name": "New Biz",
    })
    assert resp.status_code == 201
    data = resp.json()
    assert data["access_token"]
    assert data["user"]["email"] == "new@example.com"
    assert data["business"]["name"] == "New Biz"


def test_register_duplicate(client):
    payload = {
        "email": "dup@example.com",
        "password": "Pass123!",
        "full_name": "Dup",
        "business_name": "Biz",
    }
    client.post("/auth/register", json=payload)
    resp = client.post("/auth/register", json=payload)
    assert resp.status_code == 409


def test_login(client):
    client.post("/auth/register", json={
        "email": "login@example.com",
        "password": "Pass123!",
        "full_name": "Login User",
        "business_name": "Login Biz",
    })
    resp = client.post("/auth/login", data={"username": "login@example.com", "password": "Pass123!"})
    assert resp.status_code == 200
    assert resp.json()["access_token"]


def test_login_wrong_password(client):
    client.post("/auth/register", json={
        "email": "wrong@example.com",
        "password": "Pass123!",
        "full_name": "Wrong",
        "business_name": "Biz",
    })
    resp = client.post("/auth/login", data={"username": "wrong@example.com", "password": "bad"})
    assert resp.status_code == 401


def test_me(auth_client):
    resp = auth_client.get("/auth/me")
    assert resp.status_code == 200
    data = resp.json()
    assert data["email"] == "test@example.com"
    assert data["business"]["name"] == "Test Business"


def test_me_unauthenticated(client):
    resp = client.get("/auth/me")
    assert resp.status_code == 401
