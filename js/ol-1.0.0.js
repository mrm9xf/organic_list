///////////////////
// # VARIABLES # //
//////////////////

var next_subtask = `
<dl class='list'>
  <dt class="task action-hover" onmouseenter="HoverDisplay(this);" onmouseleave="HoverHide(this);">
    <input class="tasks" type="checkbox" onchange="CascadeCheck(this);"/>
    <input class="task-text" type=text onkeydown="KeyboardManipulation(this, event);" placeholder="New task..." />&nbsp;
    <span class='add-subtask' onclick="AddSubTask(this);" onmouseenter="SubTaskHoverIn(this);" onmouseleave="SubTaskHoverOut(this);">&nbsp;sub</span>
    <span class='add-task' onclick="AddTask(this);" onmouseenter="TaskHoverIn(this);" onmouseleave="TaskHoverOut(this);">task&nbsp;</span>
  </dt>
  <dd class="action-hover"></dd>
</dl>
`  

var next_task = `
<dt>
  <dl class='list'>
    <dt class="task action-hover" onmouseenter="HoverDisplay(this);" onmouseleave="HoverHide(this);">
      <input class="tasks" type="checkbox" onchange="CascadeCheck(this);"/>
      <input class="task-text" type=text onkeydown="KeyboardManipulation(this, event);" placeholder="New task..." />&nbsp;
      <span class='add-subtask' onclick="AddSubTask(this);" onmouseenter="SubTaskHoverIn(this);" onmouseleave="SubTaskHoverOut(this);">&nbsp;sub</span>
      <span class='add-task' onclick="AddTask(this);" onmouseenter="TaskHoverIn(this);" onmouseleave="TaskHoverOut(this);">task&nbsp;</span>
    </dt>
    <dd class="action-hover"></dd>
  </dl>
</dt>
`  

/////////////////
// # ACTIONS # //
/////////////////

//hover over functions (visibility of 'sub task')
function HoverDisplay(element){
    //for mouseenter
    $(element).find('.add-task').css('display', 'inline');
    $(element).find('.add-subtask').css('display', 'inline');
}

function HoverHide(element){
    //for mouseleave
    $(element).find('.add-task').css('display', 'none');
    $(element).find('.add-subtask').css('display', 'none');
}

//hover over funcitons (color of sub and task
function TaskHoverIn(element){
    //for mouseenter
    $(element).css('color', 'red');
}

function TaskHoverOut(element){
    //for mouseleave
    $(element).css('color', 'black');
}

function SubTaskHoverIn(element){
    //for mouseenter
    $(element).css('color', 'red');
}

function SubTaskHoverOut(element){
    //for mouseleave
    $(element).css('color', 'black');
}

function Cleanup(index){
  //loop through and delete tasks
  var tasks = $('.tasks');
  for(var i = 0; i < tasks.length; i++){
      var checked = tasks.eq(i).prop('checked');
    if(checked){
      var l = $('.tasks').length;
      if(l > 1){
	tasks.eq(i).parent().remove();
      }
      else{
	tasks.eq(i).parent().children('input[type="text"]').val('');
        tasks.eq(i).parent().children('input[type="checkbox"]').prop('checked', false);
      }
    }
  }
  
  //check length
  var l = $('.task-text').length;
  if(index > l){
    $('.task-text:last').focus();
  }
  else if (l-1){
    $('.task-text').eq(index).focus();
  }
  else{
    $('#first-list').children('dt').eq(0).html(next_subtask);
  }
}

function AddSubTask(element){
  var index = $('.add-subtask').index(element);
  var subtask = $('.add-subtask').eq(index).parent().next();
  var l = subtask.find('.list').length;
  if(l == 0){
    subtask.html(next_subtask);
    subtask.find('input[type="text"]').val('');
  }
  else{
    $(next_subtask).insertAfter(subtask.find('.list:last'));
    subtask.find('.list:last').val('');
  }
}

function AddTask(element){
  var index = $('.add-task').index(element);
  var task = $('.add-task').eq(index).parent().next();
  $(next_task).insertAfter(task);
  var new_task = task.next();
  new_task.find('input[type="text"]').val('');
}

function CascadeCheck(element){
  //get the index of the checkbox
  var index = $('.tasks').index(element);

  //get the value of prop checked
  var checked = $('.tasks').eq(index).prop('checked');

  //get the <dt> tag associated with '.tasks' class
  var task = $('.tasks').eq(index).parent().next('dd.action-hover');

  //initialize first "subtask"
  //var next_task = task.next();

  if(task.children().length && checked){
    //initialize a t variable to trigger when we are out of subtasks
    task.find('.tasks').prop('checked', true);
  }
  else if(task.children().length && !checked){
    //initialize a t variable to trigger when we are out of subtasks
    task.find('.tasks').prop('checked', false);
  }
}

//new function for using keydown to perform actions
function KeyboardManipulation(element,event){
  //define length and index
  var index = $('.task-text').index(element);
  
  //CTRL + up arrow
  if(event.which == 38 && event.ctrlKey){
    $('.task-text').eq(index-1).focus();
  }
  
  //CTRL + down arrow
  if(event.which == 40 && event.ctrlKey){
    $('.task-text').eq(index+1).focus();
  }
	
  //CTRL + left arrow (click task)
  if(event.which == 37 && event.ctrlKey){
    $('.add-task').eq(index).click();
  }
  
  //CTRL + right arrow (click subtask)
  if(event.which == 39 && event.ctrlKey){
    $('.add-subtask').eq(index).click();
  }
  
  //marking off an item on the list
  if(event.which == 67 && event.ctrlKey){
    //grab task
    var checkbox = $('.task-text').eq(index).prev();
    if(checkbox.prop('checked')){
    	checkbox.prop('checked', false);
    }
    else{
    	checkbox.prop('checked', true);
    }
    checkbox.change();
  }
  
  //cleanup
  ctrl_d: if(event.which == 68 && event.ctrlKey){
    event.preventDefault();
    //pull the length of the entire list, break if only master task exists
    if($('.task-text').length == 1){break ctrl_d};
    //run cleanup
    Cleanup(index);
  }
}
