///////////////////
// # VARIABLES # //
//////////////////

var subtask_html = `
<dd class="action-hover">
<input class="subtasks" type="checkbox" />
<input class="task-text" type=text value="" />&nbsp;
<span class="add-task">sub task</span>
</dd>
`;

var task_html = `
<dt class="action-hover">
<input class="tasks" type="checkbox" />
<input class="task-text" type=text value="" />&nbsp;
<span class='add-task'>&nbsp;sub</span>
<span class='add-subtask'>task&nbsp;</span>
</dt>
`;

var next_step = `
<dt>
  <dl class='list'>
    <dt class="task action-hover">
        <input class="tasks" type="checkbox" />
        <input class="task-text" type=text value="Task #1" placeholder="New task..."/>&nbsp;
        <span class='add-subtask'>&nbsp;sub</span>
        <span class='add-task'>task&nbsp;</span>
    </dt>
    <dd class="subtask"></dd>
  </dl>
`  

/////////////////
// # ACTIONS # //
/////////////////

//hover over functions
$('#first-list').on({
    mouseenter: function() {
	//$(this).find('.add-task').fadeIn();
	//$(this).find('.add-subtask').fadeIn();
    $(this).find('.add-task').css('display', 'inline');
    $(this).find('.add-subtask').css('display', 'inline');
  },
  mouseleave: function(){
      //$(this).find('.add-task').fadeOut();
      //$(this).find('.add-subtask').fadeOut();
    $(this).find('.add-task').css('display', 'none');
    $(this).find('.add-subtask').css('display', 'none');
  }
}, '.action-hover');

//hover over sub
$('#first-list').on({
    mouseenter: function() {
    $(this).css('color', 'red');
  },
  mouseleave: function(){
    $(this).css('color', 'black');
  }
}, '.add-task');

//hover over task
$('#first-list').on({
    mouseenter: function() {
    $(this).css('color', 'red');
  },
  mouseleave: function(){
    $(this).css('color', 'black');
  }
}, '.add-subtask');

//function for cleaning up tasks marked as done
$('#cleanup').click(function(){
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
  
  //add a fresh task
  if( !($('.tasks').length) ){
      
  }
});

//new functions 

$('#first-list').on('click', '.add-subtask', function(){
  var index = $('.add-subtask').index(this);
    var subtask = $('.add-subtask').eq(index).parent().next();
  subtask.html(next_step);
  subtask.find('input[type="text"]').val('');
});

$('#first-list').on('click', '.add-task', function(){
