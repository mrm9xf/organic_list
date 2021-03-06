///////////////////
// # VARIABLES # //
//////////////////

var next_subtask = `
<dl class='list'>
  <dt class="task action-hover" onmouseenter="HoverDisplay(this);" onmouseleave="HoverHide(this);">
    <input class="tasks" type="checkbox" onchange="CascadeCheck(this);"/>
    <input class="task-text" type=text placeholder="New task..." />&nbsp;
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
      <input class="task-text" type=text placeholder="New task..." />&nbsp;
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

function Cleanup(){
  //loop through and delete subtasks
  var subtasks = $('.subtasks');
  for(var i = 0; i < subtasks.length; i++){
      var checked = subtasks.eq(i).prop('checked');
    if(checked){
	subtasks.eq(i).parent().remove();
    }
  }
  
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
}

function AddSubTask(element){
  debugger;
  alert('subtask');
  var index = $('.add-subtask').index(element);
  var subtask = $('.add-subtask').eq(index).parent().next();
  subtask.html(next_subtask);
  subtask.find('input[type="text"]').val('');
}

function AddTask(element){
  debugger;
  alert('task');
  var index = $('.add-task').index(this);
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
  var task = $('.tasks').eq(index).parent();

  //initialize first "subtask"
  var next_task = task.next();

  if(next_task.children().length && checked){
    //initialize a t variable to trigger when we are out of subtasks
    next_task.find('.tasks').attr('checked', true);
  }
  else if(next_task.children().length && !checked){
    //initialize a t variable to trigger when we are out of subtasks
    next_task.find('.tasks').attr('checked', false);
  }
}
