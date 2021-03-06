function print(x){
  console.log(x);
  if(this.document){
    var el=document && document.getElementById("content");
    el.append(JSON.stringify(x)+"\r\n");
  }
}
var m="ooooooooooooo..........oo.o.oooooo.oo.o....o...oo.ooo.so.o.oo...oooo.o.oo.o.o..o.o.oo.o.o.oo.o.ooeo......o.ooooooooooooo";
var col=12,row=10;
function get(m,x,y){
  if(x<0||x>=col){
    return false;
  }
  if(y<0||y>=row){
    return false;
  }
  return m[y*col+x]
}

function getCell(m,cell){
  return get(m,cell.x,cell.y)
}

function display(m){
  for (var y=0;y<row;y++){
    var line="";
    for(var x=0;x<col;x++){
      line=line+get(m,x,y);
    }
    //console.log(line);
    print(line)
  }
}
display(m);
//QueueImplementation.c
function InitializeQueue(Q){
  var Q=[];
  return Q;
}
function Empty(Q){
  return Q.length==0;
}
function Insert(R,Q){
  return Q.push(R)
}
function Remove(Q,F){
  return Q.shift();
}

var recorded={}
function makeKey(cell){
  var key=""+cell.y+","+cell.x; 
  return key;
}
function explored(cell){
  return recorded[makeKey(cell)];
}
//实现
Q=InitializeQueue();
var start={y:4,x:6},end={y:8,x:1};
Insert(start,Q);
for(;;){

  //-Container empty? If yes, report "NO PATHS" and end program
  if(Empty(Q)){
    // console.log("NO PATHS");
    print("NO PATHS")
    break;
  }

  // -Take a cell out of Container
  var cell=Remove(Q);
  console.log('cell',cell)
  var key=makeKey(cell);

  //   -Has this cell already been recorded? If yes, then we've already
  //    explored from this cell, so skip the rest of this step and
  //    continue with the next step.
  if(explored(cell)){
    continue;
  }
  //   -Is this cell the end cell? If so, we've found a path, so
  //    print it and end program.
  if(cell.x==end.x&&cell.y==end.y){
    // print("finish!");
    print("finish!");
    printPath(cell);
    break;
  }
  
  //   -The cell is a not-previously-explored, non-end cell that is
  //    reachable from the start cell. Explore it as follows:
  //         -identify all appropriate adjacent cells in M
  //         -add these identified cells to the Container
  var up={y:cell.y-1,x:cell.x,pre:cell};
  var down={y:cell.y+1,x:cell.x,pre:cell};
  var left={y:cell.y,x:cell.x-1,pre:cell};
  var right={y:cell.y,x:cell.x+1,pre:cell};
  if((getCell(m,up)=='.'||getCell(m,up)=='e')&& !explored(up)){Insert(up,Q);}
  if((getCell(m,down)=='.'||getCell(m,down)=='e')&& !explored(down)){Insert(down,Q);}
  if((getCell(m,left)=='.'||getCell(m,left)=='e')&& !explored(left)){Insert(left,Q);}
  if((getCell(m,right)=='.'||getCell(m,right)=='e')&& !explored(right)){Insert(right,Q);}

  // console.log("up",up,getCell(m,up),explored(up))
  // console.log("down",down,getCell(m,down),explored(down))
  // console.log("left",left,getCell(m,left),explored(left))
  // console.log("right",right,getCell(m,right),explored(right))
  // console.log("Q",Q)
  
  //   -Record that this cell has been explored (so it won't be explored
  //    again).
  recorded[key]=true;
}

function printPath(cell){
  while(cell){
    print("["+cell.y+","+cell.x+"]")
    cell=cell.pre;
  }
}