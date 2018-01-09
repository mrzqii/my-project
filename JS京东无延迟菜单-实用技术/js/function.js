
 function sameSign(a,b){
    // 二进制异或运算来判断两个数是不是符号相同
    return (a^b)>=0
}

 // 向量的定义 终点坐标减去起点的坐标
function vector(a,b){
    return{
        x: b.x-a.x,
        y: b.y-a.y
    }
}
// 向量的差乘公式
function vectorProduct(v1,v2){
    return v1.x*v2.y - v2.x*v1.y
}


function isPointInTrangle(p,a,b,c) {
    var pa=vector(p,a)
    var pb=vector(p,b)
    var pc=vector(p,c)

    var t1=vectorProduct(pa,pb)
    var t2=vectorProduct(pb,pc)
    var t3=vectorProduct(pc,pa)

    return sameSign(t1,t2) && sameSign(t2,t3)
}

function needDelay(elem,leftCorner,curMousePos){
    var offset =elem.offset()
    var topLeft={
        x:offset.left,
        y:offset.top
    }
    var bottomLeft={
        x:offset.left,
        y:offset.top+elem.height()

    }

    return isPointInTrangle(curMousePos,leftCorner,topLeft,bottomLeft)
}

