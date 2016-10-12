<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window"
  design="device:mobile;" xid="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="rootClassData" idColumn="fID" onCustomRefresh="rootClassDataCustomRefresh">       
      <column label="id" name="fID" type="String" xid="default6"></column>
  <column label="标题" name="fClassName" type="String" xid="xid6"></column></div> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="secondClassData" idColumn="fID" onCustomRefresh="secondClassDataCustomRefresh"><column label="id" name="fID" type="String" xid="xid1"></column>
  <column label="一级分类ID" name="fRootID" type="String" xid="xid2"></column>
  <column label="分类名称" name="fClassName" type="String" xid="xid3"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="threeClassData" onCustomRefresh="threeClassDataCustomRefresh"></div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"> 
    <div class="x-panel-top" height="96"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" title="分类"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="分类" xid="button6" icon="icon-chevron-left" onClick="backBtnClick"> 
            <i xid="i6" class="icon-chevron-left"/>  
            <span xid="span6">分类</span>
          </a>
        <span xid="span1"><![CDATA[]]></span></div>  
        <div class="x-titlebar-title">分类</div>  
        <div class="x-titlebar-right reverse"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon more" label="button" xid="button10" icon="icon-refresh">
   <i xid="i11" class="icon-refresh"></i>
   <span xid="span10"></span></a></div> 
      </div> 
    <div component="$UI/system/components/bootstrap/row/row" class="row screening" xid="row5">
   <div class="col col-xs-4 text-align" xid="col10">
    
  <div class="dropdown btn-group" component="$UI/system/components/bootstrap/dropdown/dropdown" xid="dropdown1">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-right dropdown-toggle" label="综合排序" icon="icon-arrow-down-b" xid="button2">
    <i class="icon-arrow-down-b" xid="i2"></i>
    <span xid="span2">综合排序</span></a> 
   <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu" xid="menu1">
    <li class="x-menu-item" xid="item1">
     <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="综合排序" xid="button3">
      <i xid="i3"></i>
      <span xid="span3">综合排序</span></a> </li> 
    <li class="x-menu-item" xid="item2">
     <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="价格从高到低" xid="button4">
      <i xid="i4"></i>
      <span xid="span4">价格从高到低</span></a> </li> 
  <li class="x-menu-item" xid="item3">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="价格从低到高" xid="button5">
    <i xid="i5"></i>
    <span xid="span5">价格从低到高</span></a> </li></ul> </div></div> 
   <div class="col col-xs-4 text-align" xid="col11">
    <span xid="span31">销量优先</span></div> 
   <div class="col col-xs-4 text-align" xid="col12">
    <div class="dropdown btn-group menu-right" component="$UI/system/components/bootstrap/dropdown/dropdown" xid="dropdown2">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-right dropdown-toggle" label="筛选" icon="icon-arrow-down-b" xid="button7">
    <i class="icon-arrow-down-b" xid="i8"></i>
    <span xid="span7">筛选</span></a> 
   <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu" xid="menu2">
    <li class="x-menu-item" xid="item4">
     
  <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="免运费" xid="button8">
   <i xid="i9"></i>
   <span xid="span8">免运费</span></a></li> 
    <li class="x-menu-item" xid="item5">
     <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="消费才保障" xid="button9">
      <i xid="i10"></i>
      <span xid="span9">消费才保障</span></a> </li> 
  </ul> </div></div> </div></div>  
    <div xid="content" class="x-panel-content" style="bottom: 0px; top: 96px;"> 
      </div>  
    </div> 
</div>
