function validateAndGetFormData() {
    var rollNoVar = $("#rollNo").val();
    if (rollNoVar === "") {
        alert("Roll No is required");
        $("#rollNo").focus();
        return "";
    }
    var fullNameVar = $("#fullName").val();
    var classVar = $("#class").val();
    var birthDateVar = $("#birthDate").val();
    var addressVar = $("#address").val();
    var enrollmentDateVar = $("#enrollmentDate").val();
    var jsonStrObj = {
        rollNo: rollNoVar,
        fullName: fullNameVar,
        class: classVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollmentDate: enrollmentDateVar
    };
    return JSON.stringify(jsonStrObj);
}

function resetForm() {
    $("#studentForm").trigger("reset");
    $("#rollNo").focus();
    $("#saveBtn").prop("disabled", false);
    $("#changeBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);
}

function saveStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90932126|-31949220216199280|90962159",
        jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
}

function changeStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90932126|-31949220216199280|90962159",
        jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
}

function checkRollNo() {
    var rollNoVar = $("#rollNo").val();
    if (rollNoVar === "") return;
    var getReqStr = createGET_BY_KEYRequest("90932126|-31949220216199280|90962159",
        "SCHOOL-DB", "STUDENT-TABLE", rollNoVar);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({ async: true });
    if (resultObj && resultObj.status === 200) {
        var data = JSON.parse(resultObj.data);
        if (data) {
            $("#fullName").val(data.fullName);
            $("#class").val(data.class);
            $("#birthDate").val(data.birthDate);
            $("#address").val(data.address);
            $("#enrollmentDate").val(data.enrollmentDate);
            $("#saveBtn").prop("disabled", true);
            $("#changeBtn").prop("disabled", false);
            $("#resetBtn").prop("disabled", false);
        } else {
            $("#saveBtn").prop("disabled", false);
            $("#changeBtn").prop("disabled", true);
            $("#resetBtn").prop("disabled", false);
        }
    }
}

$(document).ready(function() {
    $("#rollNo").on("blur", checkRollNo);
    $("#rollNo").focus();
});
