<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window"
  design="device:mobile;" xid="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="listData" idColumn="id" onCustomRefresh="listDataCustomRefresh">       
      <column label="id" name="id" type="String" xid="default6"></column>
  <column label="标题" name="fTitle" type="String" xid="xid6"></column>
  <column label="图片" name="fImg" type="String" xid="xid7"></column>
  <column label="价格" name="fPrice" type="Float" xid="xid8"></column>
  <column label="邮费" name="fPostage" type="String" xid="xid9"></column>
  <column label="买出数量" name="fRecord" type="Integer" xid="xid10"></column></div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"> 
    <div class="x-panel-top" height="96"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="搜索" xid="button6" icon="icon-chevron-left" onClick="backBtnClick"> 
            <i xid="i6" class="icon-chevron-left"/>  
            <span xid="span6">搜索</span> 
          </a> 
        </div>  
        <div class="x-titlebar-title"> 
          <input component="$UI/system/components/justep/input/input" class="input-sm seach" xid="input2"></input>
  <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon seach-btn" label="button" xid="button1" icon="icon-ios7-search-strong">
   <i xid="i1" class="icon-ios7-search-strong"></i>
   <span xid="span1"></span></a></div>  
        <div class="x-titlebar-right reverse">
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon more"
            label="button" xid="button10" icon="icon-android-more"> 
            <i xid="i11" class="icon-android-more"/>  
            <span xid="span10"/>
          </a>
        </div> 
      </div>  
      <div component="$UI/system/components/bootstrap/row/row" class="row screening"
        xid="row5"> 
        <div class="col col-xs-4 text-align" xid="col10"> 
          <div class="dropdown btn-group" component="$UI/system/components/bootstrap/dropdown/dropdown"
            xid="dropdown1"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-right dropdown-toggle"
              label="综合排序" icon="icon-arrow-down-b" xid="button2"> 
              <i class="icon-arrow-down-b" xid="i2"/>  
              <span xid="span2">综合排序</span>
            </a>  
            <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu"
              xid="menu1"> 
              <li class="x-menu-item" xid="item1"> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" label="综合排序" xid="button3"> 
                  <i xid="i3"/>  
                  <span xid="span3">综合排序</span>
                </a> 
              </li>  
              <li class="x-menu-item" xid="item2"> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" label="价格从高到低" xid="button4"> 
                  <i xid="i4"/>  
                  <span xid="span4">价格从高到低</span>
                </a> 
              </li>  
              <li class="x-menu-item" xid="item3"> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" label="价格从低到高" xid="button5"> 
                  <i xid="i5"/>  
                  <span xid="span5">价格从低到高</span>
                </a> 
              </li>
            </ul> 
          </div>
        </div>  
        <div class="col col-xs-4 text-align" xid="col11"> 
          <span xid="span31">销量优先</span>
        </div>  
        <div class="col col-xs-4 text-align" xid="col12"> 
          <div class="dropdown btn-group" component="$UI/system/components/bootstrap/dropdown/dropdown"
            xid="dropdown2"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-right dropdown-toggle"
              label="筛选" icon="icon-arrow-down-b" xid="button7"> 
              <i class="icon-arrow-down-b" xid="i8"/>  
              <span xid="span7">筛选</span>
            </a>  
            <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu"
              xid="menu2"> 
              <li class="x-menu-item" xid="item4"> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" label="免运费" xid="button8"> 
                  <i xid="i9"/>  
                  <span xid="span8">免运费</span>
                </a>
              </li>  
              <li class="x-menu-item" xid="item5"> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" label="消费才保障" xid="button9"> 
                  <i xid="i10"/>  
                  <span xid="span9">消费才保障</span>
                </a> 
              </li> 
            </ul> 
          </div>
        </div> 
      </div>
    </div>  
    <div xid="content" class="x-panel-content  x-scroll-view" style="bottom: 0px; top: 96px;"> 
      <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
        xid="scrollView1"> 
        <div class="x-content-center x-pull-down container" xid="div5"> 
          <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i7"/>  
          <span class="x-pull-down-label" xid="span15">下拉刷新...</span>
        </div>  
        <div class="x-scroll-content main" xid="div6">
          <div component="$UI/system/components/justep/list/list" class="x-list"
            xid="list1" data="listData" limit="6" bind-click="listClick"> 
            <ul class="x-list-template" xid="listTemplateUl1"> 
              <li xid="li1" class="list col col-xs-6">
                <div xid="div15" class="box"> 
                  <img src="" alt="" xid="image2" bind-attr-src="val(&quot;fImg&quot;)"
                    height="100px" style="width:100%;"/>  
                  <div xid="div11" class="title"> 
                    <span bind-text="ref('fTitle')" xid="span25"/>
                  </div>  
                  <div xid="div12"> 
                    <span xid="span29" bind-text="ref('fPrice')" class="price"/>
                  </div>  
                  <div xid="div13" class="color-gray"> 
                    <span xid="span24">月销</span>  
                    <span xid="span26" bind-text="ref('fRecord')"/>  
                    <span xid="span27">笔</span>  
                    <span xid="span28" bind-text="ref('fPostage')" class="margin-left"/>
                  </div> 
                </div>
              </li>
            </ul> 
          </div> 
        </div>  
        <div class="x-content-center x-pull-up" xid="div7"> 
          <span class="x-pull-up-label" xid="span16">加载更多...</span>
        </div> 
      </div>  
       
    </div> 
  </div> 
</div>
