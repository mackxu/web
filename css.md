*css3*   
为了使用过渡把整个过程变得平滑，需要设置transition属性。   
最低限度也要为每个过渡设置两方面信息：要过渡的属性和动画时长。如
    
    -webkit-transition: background 0.5s;
    -webkit-transition: background 0.5s, color 0.5;
    -webkit-transition: all 0.5s;
>transition有4个过渡属性：   
1. transition-property：    设置过渡效果的CSS属性的名称   
2. transition-duration:    完成过渡效果的秒数或毫秒数  
3. transition-timing-function: 速度效果曲线      
>>  
- linear: 匀速运动   
- ease: 慢速开始，然后变快，然后慢速结束的过渡效果
- ease-in: 慢速开始的过渡效果
- ease-out: 慢速结束的过渡效果
- ease-in-out: 慢速开始和慢速结束的过渡效果    

  

