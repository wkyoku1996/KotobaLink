from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_student_profile() -> None:
    response = client.get("/api/v1/students/profile")

    assert response.status_code == 200
    assert response.json()["data"]["id"] == "student-demo-001"


def test_course_catalog() -> None:
    response = client.get("/api/v1/courses/catalog")

    assert response.status_code == 200
    assert len(response.json()["data"]) == 2


def test_orders() -> None:
    response = client.get("/api/v1/orders")

    assert response.status_code == 200
    assert response.json()["data"][0]["payment_status"] == "paid"


def test_material_library() -> None:
    response = client.get("/api/v1/materials/library")

    assert response.status_code == 200
    assert response.json()["data"][0]["title"] == "Marugoto Starter A1"
    assert len(response.json()["data"]) >= 3


def test_material_units() -> None:
    response = client.get("/api/v1/materials/units")

    assert response.status_code == 200
    assert response.json()["data"][0]["material_title"] == "Marugoto Starter A1"


def test_material_detail() -> None:
    response = client.get("/api/v1/materials/library/material-001")

    assert response.status_code == 200
    assert response.json()["data"]["title"] == "Marugoto Starter A1"
    assert response.json()["data"]["units"][0]["title"] == "Topic 1: かつどう"


def test_material_json_export() -> None:
    response = client.get("/api/v1/materials/library/material-001/json")

    assert response.status_code == 200
    assert response.json()["data"]["schema_version"] == "kotobalink.material.v2"
    assert response.json()["data"]["units"][0]["sections"][0]["type"] == "dialogue"
    assert response.json()["data"]["units"][0]["sections"][1]["type"] == "article"
    assert response.json()["data"]["units"][0]["sections"][2]["type"] == "vocabulary"
    assert response.json()["data"]["assets"][0]["meta"]["file_size"] > 0
    assert response.json()["data"]["publish"]["scope"] == "teacher"


def test_material_unit_detail() -> None:
    response = client.get("/api/v1/materials/units/material-unit-001")

    assert response.status_code == 200
    assert response.json()["data"]["title"] == "Topic 1: かつどう"
    assert response.json()["data"]["items"][0]["item_type"] == "audio"


def test_material_assets() -> None:
    response = client.get("/api/v1/materials/assets")

    assert response.status_code == 200
    assert response.json()["data"][0]["file_name"] == "topic01-dialogue.wav"
    assert len(response.json()["data"]) >= 10


def test_material_publish_records() -> None:
    response = client.get("/api/v1/materials/publish")

    assert response.status_code == 200
    assert response.json()["data"][0]["version"] == "v2.1"


def test_student_courses() -> None:
    response = client.get("/api/v1/students/courses")

    assert response.status_code == 200
    assert response.json()["data"][0]["course_name"] == "Conversation Foundations"


def test_login() -> None:
    response = client.post(
        "/api/v1/auth/login",
        json={"username": "admin", "password": "kotobalink123"},
    )

    assert response.status_code == 200
    assert response.json()["data"]["access_token"] == "demo-admin-token"


def test_ops_admin_login() -> None:
    response = client.post(
        "/api/v1/auth/login",
        json={"username": "ops_admin", "password": "ops123"},
    )

    assert response.status_code == 200
    assert response.json()["data"]["user"]["role"] == "ops_admin"


def test_me() -> None:
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer demo-admin-token"},
    )

    assert response.status_code == 200
    assert response.json()["data"]["username"] == "admin"
