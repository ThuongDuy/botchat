dataQuestion = [
    {
        "question": "Trạng thái cơ thể bạn thế nào ?",
        "answerList": [
            { "answer": "Bình thường" },
            { "answer": "Mệt mỏi" }
        ]
    },
    {
        "question": "Vị trí đau bụng ở đâu ?",
        "answerList": [
            { "answer": "Không đau bụng" },
            { "answer": "Đau vùng thượng vị" },
            { "answer": "Đau vùng hạ sườn phải" },
            { "answer": "Đau bụng trên và lan ra sau lưng" },
            { "answer": "Đau vùng hạ vị" },
            { "answer": "Đau toàn bụng" }
        ]
    },
    {
        "question": "Bạn có bị nôn hay cảm thấy buồn nôn không ?",
        "answerList": [
            { "answer": "Không" },
            { "answer": "Có" },
            { "answer": "Nôn ra máu" }
        ]
    },
    {
        "question": "Trạng thái cân nặng của bạn như thế nào ?",
        "answerList": [
            { "answer": "Bình thường" },
            { "answer": "Có giảm cân" },
            { "answer": "Giảm nhiều" }
        ]
    },
    {
        "question": "Trạng thái phân của bạn ?",
        "answerList": [
            { "answer": "Bình thường" },
            { "answer": "Phân nhạt màu" },
            { "answer": "Phân nhầy lẫn máu" },
            { "answer": "Phân lỏng" },
            { "answer": "Phân nâu đen" }
        ]
    },
    {
        "question": "Khẩu vị của bạn như thế nào ?",
        "answerList": [
            { "answer": "Bình thường" },
            { "answer": "Chán ăn" }
        ]
    },
    {
        "question": "Bạn có cảm thấy chướng bụng, đầy hơi không ?",
        "answerList": [
            { "answer": "Không" },
            { "answer": "Có" }
        ]
    },
    {
        "question": "Bạn có bị ợ chua không ?",
        "answerList": [
            { "answer": "Không" },
            { "answer": "Có" }
        ]
    },
    {
        "question": "Bạn có thấy xuất hiện các vết bầm tím dưới da không ?",
        "answerList": [
            { "answer": "Không" },
            { "answer": "Có" }
        ]
    },
    {
        "question": "Bạn có bị vàng da không ?",
        "answerList": [
            { "answer": "Không" },
            { "answer": "Có" }
        ]
    },
    {
        "question": "Nhiệt độ cơ thể đo được ?",
        "answerList": [
            // {"answer": "Bình thường"},
            // {"answer": "Sốt nhẹ"},
            // {"answer": "Sốt cao"}
        ]
    },
];
var chatBoxConTainer = document.getElementById("chatList");
function scrollChatBox() {
    chatBoxConTainer.scrollTop = chatBoxConTainer.scrollHeight;
}
var result = new Array();
function startExamTest() {
    result = new Array();
    $('.message-box-client').hide();
    $('.message-box-con0').show();
    var i = 0;
    questionFirst = dataQuestion[i].question;
    $('#chatList ul').append(`<hr><hr><li class="admin-message"><strong>Bắt đầu bài kiểm tra sức khỏe</strong></li>`);
    $('#chatList ul').append('<li class="admin-message">' + questionFirst + '</li>');

    var ansChoice = '<li class="admin-message">';
    for (var j = 0; j < dataQuestion[i].answerList.length; j++) {
        ansChoice += `
        <input type="radio" id="" name="trieuChung${i}" value="${(j + 1)}" data-answer="${dataQuestion[i].answerList[j].answer}">
        <label for="">${dataQuestion[i].answerList[j].answer}</label><br>
    `;
    }
    ansChoice += '</li>';
    $('#chatList ul').append(ansChoice);

    

    $("#send").click(function (e) {
        if (i < dataQuestion.length - 1) {
            ansVal = $('input[name="trieuChung' + i + '"]:checked').val();
            if ($('input[name="trieuChung' + i + '"]:checked').length === 0) {
                // alert("Not checked");
                // $('#send').prop('disabled', true);
            } else {
                result.push(ansVal);
                ansText = $('input[name="trieuChung' + i + '"]:checked').attr("data-answer");
                console.log("value: " + $('input[name="trieuChung' + i + '"]:checked').attr("data-answer"))
                $('#chatList ul').append('<li class="client-message">' + ansText + '</li>');
            }
        }
        if(i == dataQuestion.length - 1) {
            var testInp = $('#clientAnsTemp').val();
            console.log("testInp: " + testInp);
            if (testInp.trim() == '' || testInp == null) {
                $('#chatList ul').append(''); 
                console.log('null');
            } else {
                // alert(testInp);
                $('#chatList ul').append('<li class="client-message">' + testInp + '</li>');
                result.push($('#clientAnsTemp').val());
                $('#clientAnsTemp').val('');
            }
            
        }
        i++;
        if (i < dataQuestion.length - 1) {
            console.log(i);
            questionFirst = dataQuestion[i].question;
            $('#chatList ul').append('<li class="admin-message">' + questionFirst + '</li>');
            var ansChoice = '<li class="admin-message">';
            for (var j = 0; j < dataQuestion[i].answerList.length; j++) {
                // ansChoice += '<input value="' + (j+1) + '">' + (j+1) + '. ' + dataQuestion[i].answerList[j].answer + '</div>';
                ansChoice += `
                <input type="radio" id="" name="trieuChung${i}" value="${(j + 1)}" data-answer="${dataQuestion[i].answerList[j].answer}">
                <label for="">${dataQuestion[i].answerList[j].answer}</label><br>
            `;
            }
            ansChoice += '</li>';
            $('#chatList ul').append(ansChoice);
        }
        if (i == dataQuestion.length - 1) {
            questionFirst = dataQuestion[i].question;
            $('#chatList ul').append('<li class="admin-message">' + questionFirst + '</li>');
            // $('#chatList ul').append('');
            

            $('#send').css('left', '90%');
            $('#clientAnsTemp').show();
            $('.message-box-con1').css('display', 'none');
        }
        if (i == dataQuestion.length) {
            $('.message-box-con0').css('display', 'none');
            $('.message-box-con1').css('display', 'flex');
        }
        scrollChatBox();

    });
    $('#confirm').click(function () {
        
        $('.message-box-client').show();
        $('.message-box-con0').hide();
        $('.message-box-con1').hide();
        console.log(result);
        
        // alert('success: ' + JSON.stringify({"message": result}));
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/cauhoi',
            data: JSON.stringify({ "message": result }),
            contentType: 'application/json'
        })
            .done(function (res) { 
                // alert(JSON.stringify(res)); 
                console.log(JSON.stringify(res));
                if(res.data.dieutri != "") {
                    $('#chatList ul').append(`<li class="admin-message">
                        <p><strong>Chẩn đoán: </strong> ${res.data.chandoan}</p>
                        <p><strong>Khuyến nghị: </strong> ${res.data.dieutri}</p>
                    </li>`);
                } else {
                    $('#chatList ul').append(`<li class="admin-message">
                        <p><strong>Chẩn đoán: </strong> ${res.data.chandoan}</p>
                    </li>`);                                                                       
                }
                
                scrollChatBox();
                result = new Array();
            })
            .fail(function (error) { console.log('Oops... ' + JSON.stringify(error.responseJSON)); })
            // .always(() => alert("The request is over !"));
            
            scrollChatBox();
    });
    
    $('#noconfirm').click(function () {
        $('#chatList ul').append(`<hr><hr><li class="admin-message"><strong>Làm lại bài kiểm tra sức khỏe</strong></li>`);
        $('.message-box-client').show();
        $('.message-box-con0').hide();
        $('.message-box-con1').hide();
        
        $('#clientAnsTemp').hide();
        startExamTest();
        scrollChatBox();
    });
}



$(document).ready(function () {
    $('.chatbot-box').hide();
    $('.chat-icon').on('click', function () {
        $('.chat-icon').hide();
        $('.chatbot-box').show();
        // $('#chatList ul').append(`<li class="admin-message">Chào mừng bạn đến với chúng tôi</li>`);
    });

    $('#closeChatBot').on('click', function () {
        $('.chat-icon').show();
        $('.chatbot-box').hide();
    });

    $('#send-client').on('click', function () {
        result = new Array();
        var inpClient = $('#clientAns').val();
        if (inpClient.trim() == '' || inpClient == null) {

        } else {
            $('#chatList ul').append('<li class="client-message">' + inpClient + '</li>');
            $('#clientAns').val('');
            setTimeout(function () {    
                
                $.ajax({
                    type: 'POST',
                    url: 'http://127.0.0.1:5000/giaotiep',
                    data: JSON.stringify({ "message": inpClient }),
                    contentType: 'application/json'
                })
                    .done(function (res) {
                        if(res.check == 0) {
                            $('#chatList ul').append('<li class="admin-message">' + res.answer + '</li>')
                        } else {
                            $('#chatList ul').append(`<li class="admin-message">
                                <p>Bạn vui lòng trả lời một số câu hỏi của chúng tôi dưới đây để chúng tôi có thể thực hiện chẩn đoán cho bạn</p>
                                <button class="btn btn-primary" id="startDiagnose" onClick="myFunction()">Bắt đầu</button>
                            </li>`);
                        }
                        scrollChatBox()
                        ;})
                        
                    .fail(function (error) { alert('Oops... ' + JSON.stringify(error.responseJSON)); })
                    // .always(() => alert("The request is over !"));
            }, 1000);    
            scrollChatBox(); 
        }
        scrollChatBox();
    })
});
function myFunction() {
    result = new Array();
    $('#clientAnsTemp').hide();
    startExamTest();
    scrollChatBox();
}





