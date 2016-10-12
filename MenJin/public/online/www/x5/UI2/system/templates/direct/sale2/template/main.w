<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:mobile">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"> 
    <div class="x-panel-top"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="IT首页"
        class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="backBtnClick"
            xid="backBtn"> 
            <i class="icon-chevron-left"/>  
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title">IT首页</div>  
        <div class="x-titlebar-right reverse"/> 
      </div> 
    </div>  
    <div class="x-panel-content x-bg-img"> 
      <div class="grid92"> 
        <div component="$UI/system/components/bootstrap/carousel/carousel"
          class="x-carousel carousel" xid="carousel1"> 
          <ol class="carousel-indicators" xid="ol1"/>  
          <div class="x-contents carousel-inner" role="listbox" component="$UI/system/components/justep/contents/contents"
            active="0" slidable="true" wrap="true" swipe="true" xid="contents1" style="height:240px;"> 
            <div class="x-contents-content" xid="content1"> 
              <img class="image-wall" src="./img/carouselBox21.jpg" bind-click="open"
                url="./contents/content1.w" style="height:240px;"/> 
            </div>  
            <div class="x-contents-content" xid="content2"> 
              <img class="image-wall" src="./img/carouselBox21.jpg" bind-click="open"
                url="./contents/content1.w" style="height:240px;"/> 
            </div>  
            <div class="x-contents-content" xid="content3"> 
              <img class="image-wall" src="./img/carouselBox21.jpg" bind-click="open"
                url="./contents/content1.w" style="height:240px;"/> 
            </div>  
            <div class="x-contents-content" xid="content4"> 
              <img class="image-wall" src="./img/carouselBox21.jpg" bind-click="open"
                url="./contents/content1.w" style="height:240px;"/> 
            </div> 
          </div> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row grid"
          xid="row1"> 
          <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col1"> 
            <div class="card" url="./channel/menu11Pic1.w" bind-click="open"> 
              <img src="./img/menu11Pic1.png" />  
              <span class="title"><![CDATA[关于我们]]></span> 
            </div> 
          </div>  
          <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col2"> 
            <div class="card" url="./channel/menu11Pic2.w" bind-click="open"> 
              <img src="./img/menu11Pic2.png"/> 
              <span class="title"><![CDATA[产品中心]]></span> 
            </div> 
          </div>  
          <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col3"> 
            <div class="card" url="./channel/menu11Pic3.w" bind-click="open"> 
              <img src="./img/menu11Pic3.png" />
              <span class="title"><![CDATA[成功案例]]></span> 
            </div> 
          </div>  
          <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col4"> 
            <div class="card" url="./channel/menu11Pic4.w" bind-click="open"> 
              <img src="./img/menu12Pic2.png"/>  
              <span class="title"><![CDATA[促销活动]]></span> 
            </div> 
          </div>  
          <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col5"> 
            <div class="card" url="./channel/menu13Pic1.w" bind-click="open"> 
              <img src="./img/menu13Pic1.png"/>  
              <span class="title"><![CDATA[最新动态]]></span> 
            </div> 
          </div>  
          <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col6"> 
            <div class="card" url="./channel/menu13Pic3.w" bind-click="open"> 
              <img src="./img/menu13Pic3.png"/>
              <span class="title"><![CDATA[联系我们]]></span> 
            </div> 
          </div>  
          <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1"> 
            <div class="card" url="./channel/menu14Pic1.w" bind-click="open"> 
              <img src="./img/menu14Pic1.png"/>  
              <span class="title"><![CDATA[售后服务]]></span> 
            </div> 
          </div>  
          <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1"> 
            <div class="card" url="./channel/menu14Pic2.w" bind-click="open"> 
              <img src="./img/menu14Pic2.png"/>  
              <span class="title"><![CDATA[服务项目]]></span> 
            </div> 
          </div>  
          <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1"> 
            <div class="card" url="./channel/menu2Pic9.w" bind-click="open"> 
              <img src="./img/menu2Pic9.png"/>  
              <span class="title"><![CDATA[企业文化]]></span> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
