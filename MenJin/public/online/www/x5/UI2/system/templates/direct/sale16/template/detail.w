<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window"
  design="device:mobile;" xid="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="imgData" idColumn="id" onCustomRefresh="imgDataCustomRefresh"> 
      <column label="id" name="id" type="String" xid="xid2"/>  
      <column label="图片" name="fImgUrl" type="String" xid="xid1"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="commentsData" idColumn="id" onCustomRefresh="commentsDataCustomRefresh">
      <column label="id" name="id" type="String" xid="xid3"></column>
  <column label="用户名" name="fUserName" type="String" xid="xid4"></column>
  <column label="用户头像" name="fUserImg" type="String" xid="xid7"></column>
  <column label="评分" name="fScore" type="Float" xid="xid5"></column>
  <column label="评论内容" name="fContent" type="String" xid="xid6"></column>
  <column label="评论日期" name="fDate" type="Date" xid="xid8"></column></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="goodsData" idColumn="id" onCustomRefresh="goodsDataCustomRefresh">         
      <column label="id" name="id" type="String" xid="column1"></column>
  <column label="标题" name="fTitle" type="String" xid="column2"></column>
  <column label="图片" name="fImg" type="String" xid="column3"></column>
  <column label="价格" name="fPrice" type="Float" xid="column4"></column>
  <column label="原价格" name="fOldPrice" type="Float" xid="column5"></column>
  <column label="邮费" name="fPostage" type="String" xid="column6"></column>
  <column label="买出数量" name="fRecord" type="Integer" xid="column7"></column>
  <column label="所在地区" name="fAddress" type="String" xid="column8"></column></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="shopData" idColumn="id" onCustomRefresh="shopDataCustomRefresh">
      <column name="id" type="String" xid="xid9"></column>
  <column label="店名" name="fShopName" type="String" xid="xid10"></column>
  <column label="等级" name="fLevel" type="Integer" xid="xid11"></column>
  <column label="店标" name="fShopImg" type="String" xid="xid16"></column>
  <column label="描述相符" name="fConsistent" type="Float" xid="xid12"></column>
  <column label="服务态度" name="fService" type="Float" xid="xid13"></column>
  <column label="商品数量" name="fGoodsNumber" type="Integer" xid="xid14"></column>
  <column label="关注人数" name="fFocusNumber" type="Integer" xid="xid15"></column></div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"> 
    <div class="x-panel-top"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        title="商品详情"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="搜索" xid="button6" icon="icon-chevron-left" onClick="backBtnClick"> 
            <i xid="i6" class="icon-chevron-left"/>  
            <span xid="span6">搜索</span>
          </a>
        </div>  
        <div class="x-titlebar-title">商品详情</div>  
        <div class="x-titlebar-right reverse"/> 
      </div> 
    </div>  
    <div class="x-panel-content"> 
      <div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel carousel"
        xid="carousel1"> 
        <ol class="carousel-indicators" xid="ol1"/>  
        <div class="x-contents carousel-inner" role="listbox" component="$UI/system/components/justep/contents/contents"
          active="0" slidable="true" wrap="true" swipe="true" xid="contents1" style="height:240px;"> 
          <div class="x-contents-content" xid="content1">
            <img alt="" xid="image1" id="image1" class="image-wall" height="240px"/> 
          </div>  
          <div class="x-contents-content" xid="content2">
            <img alt="" xid="image2" id="image2" class="image-wall" height="240px"/>
          </div>
        </div> 
      </div>  
      <div xid="div1" class="interval"/>  
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row6"> 
        <div class="col col-xs-10" xid="col8">
          <div xid="div3" class=" padding-all buyTitle">
            <span xid="span12" bind-text="goodsData.ref('fTitle')"/>
          </div>  
          <div xid="div4" class="padding-lr">
            <span xid="span17" class="price"><![CDATA[￥]]></span>
            <span xid="span29" bind-text="goodsData.ref('fPrice')" class="price"/> 
          </div>  
          <div xid="div5" class="padding-lr"> 
            <span xid="span19" class="color-gray"><![CDATA[价格：]]></span>
            <span xid="span18" class="color-gray del-line">￥</span>
            <span xid="span13" bind-text="goodsData.ref('fOldPrice')" class="color-gray del-line"/> 
          </div> 
        </div>  
        <div class="col col-xs-2" xid="col9">
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-top"
            label="分享" xid="shareBtn" icon="icon-steam" onClick="shareBtnClick"> 
            <i xid="i10" class="icon-steam"/>  
            <span xid="span10">分享</span>
          </a>
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row color-gray"
          xid="row7"> 
          <div class="col col-xs-4" xid="col11">
            <span xid="span14" class="padding-l"><![CDATA[快递]]></span>  
            <span xid="span15" bind-text="goodsData.ref('fPostage')"><![CDATA[]]></span>
          </div>  
          <div class="col col-xs-4 text-align" xid="col12">
            <span xid="span24">月销</span>  
            <span xid="span26" bind-text="goodsData.ref('fRecord')"/>  
            <span xid="span27">笔</span>
          </div>  
          <div class="col col-xs-4 text-align" xid="col13">
            <span xid="span16" bind-text="goodsData.ref('fAddress')"/>
          </div>
        </div>
      </div>
      <div xid="div2" class="interval"/>  
      <div xid="div7" class="chooseTitle padding-lr">
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-top btn-only-icon"
          label="button" xid="button11" icon="icon-chevron-right"> 
          <i xid="i11" class="icon-chevron-right"/>  
          <span xid="span21"/>
        </a>
        <span xid="span20"><![CDATA[选择颜色分类]]></span> 
      </div>
      <div xid="div6" class="interval"/>  
      <div xid="div13" class="chooseTitle padding-lr"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-top btn-only-icon"
          label="button" xid="button4" icon="icon-chevron-right"> 
          <i xid="i4" class="icon-chevron-right"/>  
          <span xid="span5"/>
        </a>  
        <span xid="span4"><![CDATA[宝贝详情]]></span>
      </div>
      <div xid="div14" class="interval"/>
      <div xid="div8" class="chooseTitle padding-lr"> 
        <span xid="span22"><![CDATA[宝贝评价（]]></span>  
        <span xid="span25" bind-text="commentsData.count()"><![CDATA[]]></span>  
        <span xid="span28"><![CDATA[）]]></span> 
      </div>
      <div xid="div9" class="comments padding-lr">
        <img src="" alt="" xid="image3" class="img-circle" bind-attr-src="commentsData.ref('fUserImg')"/>  
        <span xid="span30" bind-text="commentsData.ref('fUserName')" class="font-weight padding-lr"/>
        <div xid="div10"> 
          <span xid="span32" bind-text="commentsData.ref('fContent')"/>
        </div>
        <div xid="div12"> 
          <span xid="span36" bind-text="commentsData.ref('fDate')" class="color-gray"/>
        </div>
        <div xid="div11" class="text-align chooseTitle line-top"> 
          <span xid="moreBtn" bind-click="moreBtnClick"><![CDATA[查看更多评论]]></span> 
        </div> 
      </div>  
      <div xid="div15" class="interval"/>  
      <div xid="div19" class="shop padding-all"> 
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="row2"> 
          <div class="col col-xs-2" xid="col14"> 
            <img src="" alt="" xid="image4" class="img-rounded" bind-attr-src="shopData.ref('fShopImg')"/>
          </div>  
          <div class="col col-xs-10" xid="col15"> 
            <span xid="span46" bind-text="shopData.ref('fShopName')" class="block font-weight"/>  
            <span xid="span48" class="color-gray block" bind-text="shopData.ref('fLevel')">关注人数</span>
          </div> 
        </div>
        <div xid="div18" class="indexdata"> 
          <span xid="span23" class="color-gray"><![CDATA[描述相符]]></span>  
          <span xid="span35" bind-text="shopData.ref('fConsistent')" class="color-orange"/>  
          <span xid="span38" class="color-gray"><![CDATA[服务态度]]></span>  
          <span xid="span37" bind-text="shopData.ref('fService')" class="color-green"/>
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="row1"> 
          <div class="col col-xs-6 number" xid="col1">
            <span xid="span41" bind-text="shopData.ref('fGoodsNumber')" class="block text-align line"/>  
            <span xid="goodsBtn" class="color-gray block text-align line" bind-click="goodsBtnClick"><![CDATA[全部宝贝]]></span>
          </div>  
          <div class="col col-xs-6 number" xid="col2">
            <span xid="span44" bind-text="shopData.ref('fFocusNumber')" class="block text-align"/>  
            <span xid="span43" class="color-gray block text-align"><![CDATA[关注人数]]></span>
          </div>  
          <div class="col col-xs-6" xid="col4">
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
              label="查看宝贝分类" xid="classBtn" icon="icon-navicon" style="width:98%;" onClick="classBtnClick"> 
              <i xid="i9" class="icon-navicon"/>  
              <span xid="span40">查看宝贝分类</span>
            </a>
          </div>  
          <div class="col col-xs-6" xid="col5">
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
              label="进店逛逛" xid="storeBtn" icon="icon-bag" style="width:98%;" onClick="storeBtnClick"> 
              <i xid="i5" class="icon-bag"/>  
              <span xid="span39">进店逛逛</span>
            </a>
          </div>
        </div> 
      </div>
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row5"> 
        <div class="col col-xs-5" xid="col3">
          <div component="$UI/system/components/justep/button/buttonGroup"
            class="btn-group btn-group-justified quick" tabbed="true" xid="buttonGroup1">
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-top"
              label="客服" xid="button1" icon="icon-ios7-chatboxes-outline"> 
              <i xid="i1" class="icon icon-ios7-chatboxes-outline"/>  
              <span xid="span1">客服</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-top"
              label="店铺" xid="button2" icon="icon-bag"> 
              <i xid="i2" class="icon icon-bag"/>  
              <span xid="span2">店铺</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-top"
              label="收藏" xid="button3" icon="icon-ios7-star-outline"> 
              <i xid="i3" class="icon icon-ios7-star-outline"/>  
              <span xid="span3">收藏</span>
            </a> 
          </div>
        </div>  
        <div class="col col-xs-7" xid="col6">
          <div component="$UI/system/components/justep/button/buttonGroup"
            class="btn-group btn-group-justified shopping" tabbed="true" xid="buttonGroup2"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label"
              label="加入购物车" xid="shoppingCartBtn" icon="icon-radio-waves" onClick="shoppingCartBtnClick"> 
              <i xid="i8" class="icon-radio-waves icon"/>  
              <span xid="span7">加入购物车</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label"
              label="立即购买" xid="buyBtn" icon="icon-android-display" onClick="buyBtnClick"> 
              <i xid="i7" class="icon-android-display icon"/>  
              <span xid="span8">立即购买</span>
            </a> 
          </div>
        </div> 
      </div>
    </div>
  </div> 
</div>
