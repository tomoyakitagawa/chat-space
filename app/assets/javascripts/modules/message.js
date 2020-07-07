$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="main-chat__message-list__message-box">
          <div class="main-chat__message-list__message-box__message-info">
            <div class="main-chat__message-list__message-box__message-info__user-name">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__message-box__message-info__info-date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__message-list__message-box__message-info__message">
            <p class="main-chat__message-list__message-box__message-info__message__message-content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="main-chat__message-list__message-box">
        <div class="main-chat__message-list__message-box__message-info">
          <div class="main-chat__message-list__message-box__message-info__user-name">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__message-box__message-info__info-date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__message-box__message-info__message">
          <p class="main-chat__message-list__message-box__message-info__message__message-content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__message-list').append(html);      
      $('form')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.submit-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop("disabled", false);
    });
  });
});