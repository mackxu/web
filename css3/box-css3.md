# CSS3 box
父容器样式必须有定义：`"{ display: -webkit-box }"`  
现象：水平时只能在一行布局，子容器在垂直方向上会填充父容器。  
技巧：可以做水平居中和垂直居中。也可以实现经典的n列布局  
说明：本文所用到的属性只在webkit内核的浏览器上做过测试
## box-origin (horizontal)
The box-orient property specifies whether the children of a box should be laid out horizontally or vertically.  
> Children within a horizontal box are displayed from left to right, and children within a vertical box are displayed top to bottom. However, the box-direction and box-ordinal-group properties can change this ordering.
  
**box-orient:** horizontal|vertical|inline-axis|block-axis|inherit;  
**Default value:**	inline-axis  
## box-direction 
The box-direction property specifies the direction in which child elements of a box element are laid out.  
**box-direction:** normal|reverse|inherit;    
> reverse:	Display the child elements in the reverse direction

**Default value:**	normal
  
## box-pack (水平方向)
The box-pack property specifies where child elements of a box are placed when the box is larger than the size of the children.  This property specifies the horizontal position in horizontal boxes, and the vertical position in vertical boxes.  
**box-pack:** start|end|center|justify;  
**Default value:**	start
## box-align (垂直方向)
The box-align property specifies how to align the child elements of a box.  
**box-align:** start|end|center|baseline|stretch;  
**Default value:**	stretch
## box-flex (定义在子容器中)
The box-flex property specifies whether the child elements of a box is flexible or inflexible in size.
> Elements that are flexible can shrink or grow as the box shrinks and grows. Whenever there is extra space in a box, flexible elements are expanded to fill that space.
  
**box-flex:** value;  
**Default value:**	0.0 (indicates that the element is inflexible)