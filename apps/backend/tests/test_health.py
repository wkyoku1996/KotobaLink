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
    assert len(response.json()["data"]) == 3


def test_orders() -> None:
    response = client.get("/api/v1/orders")

    assert response.status_code == 200
    assert response.json()["data"][0]["payment_status"] == "paid"


def test_material_library() -> None:
    response = client.get("/api/v1/materials/library")

    assert response.status_code == 200
    assert response.json()["data"][0]["title"] == "入门口语套餐 A1"
    assert len(response.json()["data"]) >= 3


def test_material_units() -> None:
    response = client.get("/api/v1/materials/units")

    assert response.status_code == 200
    assert any(item["material_title"] == "入门口语套餐 A1" for item in response.json()["data"])


def test_material_detail() -> None:
    response = client.get("/api/v1/materials/library/material-001")

    assert response.status_code == 200
    assert response.json()["data"]["title"] == "入门口语套餐 A1"
    assert response.json()["data"]["units"][0]["title"] == "第1课：はじめまして"


def test_material_json_export() -> None:
    response = client.get("/api/v1/materials/library/material-001/json")

    assert response.status_code == 200
    assert response.json()["data"]["schema_version"] == "kotobalink.material.v2"
    assert response.json()["data"]["units"][0]["sections"][0]["type"] == "dialogue"
    assert response.json()["data"]["units"][0]["sections"][1]["type"] == "article"
    assert response.json()["data"]["units"][0]["sections"][2]["type"] == "vocabulary"
    assert response.json()["data"]["assets"][0]["meta"]["file_size"] > 0
    assert response.json()["data"]["publish"]["scope"] == "teacher"


def test_package_template_export() -> None:
    response = client.get("/api/v1/materials/library/material-001/template")

    assert response.status_code == 200
    assert response.json()["data"]["schema_version"] == "kotobalink.package.v1"
    assert response.json()["data"]["courses"][0]["units"][0]["contents"][0]["type"] == "dialogue"


def test_package_template_update() -> None:
    template_response = client.get("/api/v1/materials/library/material-001/template")
    assert template_response.status_code == 200

    template = template_response.json()["data"]
    template["title"] = "入门口语套餐 A1 更新版"
    template["courses"][0]["title"] = "入门口语课程更新版"

    update_response = client.put("/api/v1/materials/library/material-001/template", json=template)

    assert update_response.status_code == 200
    assert update_response.json()["data"]["template"]["title"] == "入门口语套餐 A1 更新版"
    assert update_response.json()["data"]["template"]["courses"][0]["title"] == "入门口语课程更新版"


def test_material_release_create_list_and_detail() -> None:
    create_response = client.post(
        "/api/v1/materials/library/material-001/releases",
        json={"note": "第一版发布快照", "published_by": "ops_admin"},
    )

    assert create_response.status_code == 200
    release_id = create_response.json()["data"]["id"]
    assert create_response.json()["data"]["version_number"].startswith("v")
    assert create_response.json()["data"]["snapshot_json"]["title"] == "入门口语套餐 A1"

    list_response = client.get("/api/v1/materials/library/material-001/releases")
    assert list_response.status_code == 200
    assert any(item["id"] == release_id for item in list_response.json()["data"])

    detail_response = client.get(f"/api/v1/materials/library/material-001/releases/{release_id}")
    assert detail_response.status_code == 200
    assert detail_response.json()["data"]["id"] == release_id
    assert detail_response.json()["data"]["snapshot_json"]["courses"][0]["title"] == "入门口语课程 A1"

    second_create_response = client.post(
        "/api/v1/materials/library/material-001/releases",
        json={"note": "第二版发布快照", "published_by": "ops_admin"},
    )
    assert second_create_response.status_code == 200
    second_release_id = second_create_response.json()["data"]["id"]

    go_live_response = client.post(
        f"/api/v1/materials/library/material-001/releases/{release_id}/go-live"
    )
    assert go_live_response.status_code == 200
    assert go_live_response.json()["data"]["status"] == "live"
    assert go_live_response.json()["data"]["is_live"] is True

    second_go_live_response = client.post(
        f"/api/v1/materials/library/material-001/releases/{second_release_id}/go-live"
    )
    assert second_go_live_response.status_code == 200
    assert second_go_live_response.json()["data"]["status"] == "live"
    assert second_go_live_response.json()["data"]["is_live"] is True

    refreshed_first_detail = client.get(f"/api/v1/materials/library/material-001/releases/{release_id}")
    assert refreshed_first_detail.status_code == 200
    assert refreshed_first_detail.json()["data"]["status"] == "published"
    assert refreshed_first_detail.json()["data"]["is_live"] is False

    archive_response = client.post(
        f"/api/v1/materials/library/material-001/releases/{second_release_id}/archive"
    )
    assert archive_response.status_code == 200
    assert archive_response.json()["data"]["status"] == "archived"
    assert archive_response.json()["data"]["is_live"] is False


def test_mini_live_courses_and_detail() -> None:
    create_response = client.post(
        "/api/v1/materials/library/material-001/releases",
        json={"note": "小程序课程页演示版本", "published_by": "ops_admin"},
    )
    assert create_response.status_code == 200
    release_id = create_response.json()["data"]["id"]

    go_live_response = client.post(
        f"/api/v1/materials/library/material-001/releases/{release_id}/go-live"
    )
    assert go_live_response.status_code == 200

    list_response = client.get("/api/v1/mini/courses")
    assert list_response.status_code == 200
    assert len(list_response.json()["data"]) >= 1
    assert list_response.json()["data"][0]["liveVersion"].startswith("v")

    course_id = list_response.json()["data"][0]["id"]
    detail_response = client.get(f"/api/v1/mini/courses/{course_id}")
    assert detail_response.status_code == 200
    assert detail_response.json()["data"]["detail"]["title"]
    assert len(detail_response.json()["data"]["detail"]["lessons"]) >= 1


def test_mini_my_courses_and_detail() -> None:
    list_response = client.get("/api/v1/mini/me/courses")
    assert list_response.status_code == 200
    assert len(list_response.json()["data"]) >= 1

    course_id = list_response.json()["data"][0]["courseId"]
    detail_response = client.get(f"/api/v1/mini/me/courses/{course_id}")
    assert detail_response.status_code == 200
    assert detail_response.json()["data"]["enrollment"]["courseId"] == course_id
    assert len(detail_response.json()["data"]["detail"]["assessments"]) >= 1


def test_mini_course_summary() -> None:
    response = client.get("/api/v1/mini/me/course-summary")
    assert response.status_code == 200
    assert response.json()["data"]["lessonCompleted"] == 4
    assert response.json()["data"]["lessonTotal"] >= 1
    assert response.json()["data"]["level"] == "N4"


def test_mini_assessment_detail() -> None:
    response = client.get("/api/v1/mini/me/courses/course-001/assessments/assessment-1")
    assert response.status_code == 200
    assert response.json()["data"]["id"] == "assessment-1"
    assert len(response.json()["data"]["questions"]) >= 1


def test_package_template_create_and_delete() -> None:
    template = {
        "schema_version": "kotobalink.package.v1",
        "id": "material-test-crud",
        "title": "CRUD Template",
        "series": "KotobaLink Original",
        "level": "A1",
        "language": "jp-cn",
        "version": "v1.0",
        "summary": "CRUD template summary",
        "status": "draft",
        "visibility": "teacher",
        "tags": [],
        "courses": [
            {
                "id": "course-test-crud",
                "title": "CRUD Course",
                "status": "draft",
                "summary": "Course summary",
                "units": [
                    {
                        "id": "unit-test-crud",
                        "title": "Unit 1",
                        "code": "unit-01",
                        "sort_order": 1,
                        "status": "draft",
                        "learning_goal": "Test goal",
                        "contents": [],
                    }
                ],
            }
        ],
    }

    create_response = client.post("/api/v1/materials/library/template", json=template)

    assert create_response.status_code == 200
    assert create_response.json()["data"]["id"] == "material-test-crud"

    delete_response = client.delete("/api/v1/materials/library/material-test-crud/template")

    assert delete_response.status_code == 200
    assert delete_response.json()["data"]["deleted"] is True


def test_material_unit_detail() -> None:
    response = client.get("/api/v1/materials/units/material-unit-001")

    assert response.status_code == 200
    assert response.json()["data"]["title"] == "第1课：はじめまして"
    assert response.json()["data"]["items"][0]["item_type"] == "audio"


def test_material_assets() -> None:
    response = client.get("/api/v1/materials/assets")

    assert response.status_code == 200
    assert response.json()["data"][0]["file_name"] == "第1课-初次见面对话音频.wav"
    assert len(response.json()["data"]) >= 10


def test_material_publish_records() -> None:
    response = client.get("/api/v1/materials/publish")

    assert response.status_code == 200
    assert response.json()["data"][0]["version"] == "v2.1"


def test_student_courses() -> None:
    response = client.get("/api/v1/students/courses")

    assert response.status_code == 200
    assert response.json()["data"][0]["course_name"] == "入门口语课程 A1"


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
