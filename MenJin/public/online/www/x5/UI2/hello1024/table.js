/**
 * Created by Administrator on 2015/08/15.
 */
var data=[{Passage:'2',Date:'2015-3-5',Number:'56',Weeks:'3'},
           {Passage:'3',Date:'2015-3-7',Number:'32',Weeks:'3'},
           {Passage:'4',Date:'2015-3-12',Number:'87',Weeks:'6'},
           {Passage:'2',Date:'2015-3-16',Number:'35',Weeks:'8'},
           {Passage:'10',Date:'2015-3-17',Number:'43',Weeks:'5'},
           {Passage:'10',Date:'2015-3-17',Number:'43',Weeks:'5'}];
var flag=true;
function showTable(){
    var body=document.getElementsByTagName('body')[0];
    //body.appendChild(createTable(data));
    if(flag){
    var test=document.getElementById("test");
    test.appendChild(createTable(data));
    flag=false;
    }
    $("test").appendChild(createTable(data));
};
var createTable = function(data){

//������
    var table=document.createElement('table');
    table.setAttribute('style','width: 950px;');

//���������
    var caption=document.createElement('caption');
    caption.innerHTML ='information table';

//��������ӽ���
    table.appendChild(caption);
//����createTr()������ɱ����в�������ӵ�table�С�
    table.appendChild(createTr('Passage','Date','Number','Weeks'));
    table.childNodes[1].setAttribute('style','background:#cae8ea;');
//alert(table.firstChild);
//forѭ��json����,Ȼ��ѭ�����Ķ���ͨ��createTr()��������У���ӵ�table��
    for(var i=0;i<data.length;i++){
        table.appendChild(createTr(data[i].Passage,data[i].Date,data[i].Number,data[i].Weeks));
    }
    return table;
};
//����û��������ı�����ɱ�����еķ���
var createTr = function(Passage,Date,Number,Weeks){
//������Ԫ�ر�ǩ
    var tr=document.createElement('tr');
//������Ԫ�ر�ǩ
    var tdName=document.createElement('td');
//���ø��нڵ���ı��ڵ��ֵ
    tdName.innerHTML = Passage;
    var tdAge = document.createElement('td');

    tdAge.innerHTML = Date;
    var tdGender = document.createElement('td');
    tdGender.appendChild(document.createTextNode(Number));//�ȼ��� tdGender.innerHTML = gender;
    var tdWeeks=document.createElement('td');
    tdWeeks.innerHTML=Weeks;
//����ֵ��ӵ���Ԫ�ؽڵ�
    tr.appendChild(tdName);
    tr.appendChild(tdAge);
    tr.appendChild(tdGender);
    tr.appendChild(tdWeeks);
//������ɵ��б�ǩ
    return tr;
};