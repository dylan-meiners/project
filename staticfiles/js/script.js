$(document).ready(function(){
  console.log('Ready!');

  //==============================================================================
  //Handlers
  //------------------------------------------------------------------------------

  $('.add-website-button').click(function(){
    $('.add-website-popup').show();
  });

  $('.close-button-x').click(function(){
    $('.add-website-popup').css("padding-top", "100%");
    $('.add-website-popup').hide();
  });

  $('.add-website-popup-targets-add').click(function(){
    $('.add-website-popup-targets-ul').append(
      '<li>' +
        '<input type="text" class="add-website-popup-targets-form-input"' +
        'name="add-website-popup-targets-form-input" placeholder="Target"' +
        'onkeypress="return inputKeyPress(event);" autocomplete="off" spellcheck="false" />' +
        '<button class="add-website-popup-targets-remove">X</button>' +
      '</li>'
    );
  });

  $('.add-website-popup-website-form').submit(function(event){
    event.preventDefault();
  });

  //==============================================================================

  main();
});

function inputKeyPress(e) {
  e = e||window.event;
  var key = e.keyCode;
  if (key == 13) {
    return false;
  }
}

function initElements(){
}

function websiteAlreadyExists(data, i){
  var isTrue;

  $('.websites-list-data').each(function(){ // for each website already in list of websites
    if (this.id == data['websites'][i].site) {
      isTrue = true;
    }
  });

  if (isTrue) {
    return true;
  } else {
    return false;
  }
}

function tagsToString(string){
  var openTagsFixed;
  var closedTagsFixed;

  openTagsFixed = string.replace('<', '&lt');
  closedTagsFixed = openTagsFixed.replace('>', '&gt');

  return closedTagsFixed;
}

function updateJSON(){
  $.getJSON('static/js/data.json', function(data){
    $.each(data.websites, function(i, v){  // for each website in data.json
      if (!websiteAlreadyExists(data, i)) {
        $('.websites-list').append('<li class="websites-list-data" id="' +
                                    data['websites'][i].site +
                                    '">' +
                                    data['websites'][i].site +
                                    '<ul class="websites-list-data-info">' +
                                    '<li class="websites-list-data-info-data-targets">' +
                                    'Targets: ' + tagsToString(data['websites'][i].targets) +
                                    '</li>' +
                                    '<li class="websites-list-data-info-data-action">' +
                                    'Action: ' + data['websites'][i].action +
                                    '</li>' +
                                    '</ul></li>');
      }
    });
  });
}

function updateAddWebsite(){

  $('.add-website-popup-targets-remove').click(function(){
    $(this).parent().remove();
  });

  $('.add-website-popup').css("padding-top", ($(window).height() - $('.add-website-popup-content').outerHeight()) / 2);

  var websiteStepFormsData = $('.add-website-popup-website-form').serializeArray();
  address = websiteStepFormsData[0].value

  if (address != "") {
    $('.add-website-popup-website').css({  // step div border green
      "border":"1px solid #19c613",
    });
    $('.add-website-popup-website-title').css({ // title green
      "color":"#19c613"
    });
    $('.add-website-popup-website-hr').css({  // hr green
      "border":"1px solid #19c613"
    });
    $('.add-website-popup-website-form-input').css({ // input border green
      "border":"1px solid #19c613",
    });
  } else {
    $('.add-website-popup-website').css({  // step div border red
      "border":"1px solid #e81414",
    });
    $('.add-website-popup-website-title').css({ // title red
      "color":"#e81414"
    });
    $('.add-website-popup-website-hr').css({  // hr red
      "border":"1px solid #e81414"
    });
    $('.add-website-popup-website-form-input').css({ // input border red
      "border":"1px solid #e81414",
    });
  }
}

function mainloop(){
  if ($('.add-website-popup').is(':visible')) {
    updateAddWebsite();
  }
}

function main(){
  initElements();
  updateJSON();
  window.setInterval(updateJSON, 5000);
  window.setInterval(mainloop, 1);
  mainloop();
}
