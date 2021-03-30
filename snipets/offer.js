

exports.snipetHTML = (dataPush,order,customer) => {
  let Sc = 0;
  for (let i = 1; i < dataPush.length; i++) {
    Sc = +Sc + +(dataPush[i].summ / 1.2);
  }
  Sc = Sc.toFixed(2);
  let nds = (Sc * 0.2).toFixed(2);
  let all = (+Sc + +nds).toFixed(2);

  const spec = () => {
    let con = new Array();
    let con1 = new Array();
    con = dataPush.map(
      (sp) => `
    <tr>
    <td> ${sp.id} </td>
    <td>${sp.name}</td>
    <td style="text-align:center"> ${sp.Q} </td>
    <td style="text-align:center"> шт. </td>
    <td style="text-align:right"> ${(sp.cost/1.2).toFixed(2)} </td>
    <td style="text-align:right"> ${(sp.summ/1.2).toFixed(2)} </td>
    </tr>`
    );

    let reduser = (accumulator, currentValue) => accumulator + currentValue;

    return (con1 = con.splice(1, con.length - 1).reduce(reduser));
  };
  const str = require("../number2string.js");
  let all_str=str.number_to_string(all);

  const date = require("../dateCreator")
  let d =date.date();

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        .page{
            width: 210mm;
            margin-left: auto;
            margin-right: auto;
            margin-top: 15mm;
        }
        .list {
            width:185mm;
            margin-left: 20mm;
		    margin-right: 5mm; 
        }
        .table1 {
            font-size: 12px;
        }
        .ident h1 {
            font-size: 30px;
        }
        .ident h1 {
            margin-bottom: 0;
        }
        
        
        </style>
    </head>
    <body>
        <div class="page">
            <div class="list">
                <div class="bank" >
                    <table width="100%" border="1" cellspacing="0" class="table1">
                        <tr class="td">
                            <td class="t1" colspan="2" rowspan="2" width="50%" >
                                    ФИЛИАЛ В Г. САНКТ-ПЕТЕРБУРГ ПАО "МИНБАНК"<br/>
                                    Г. САНКТ-ПЕТЕРБУРГ<br/> 
                                    Банк получателя<br/>
                            </td>
                            <td width="10%">БИК</td>
                            <td rowspan="2">044030755<br/><br/>30101810200000000775</td>
                        </tr>
                        <tr class="td">
                            <td>Сч. №</td>
                        </tr>
                        <tr class="td">
                            <td width="25%">ИНН 7810859957</td>
                            <td>КПП 781701001</td>
                            <td rowspan="2">Сч. №</td>
                            <td rowspan="2">40702810402360000086</td>
                        </tr>
                        <tr class="td">
                            <td colspan="2">ООО "Паллада"<br/>Получатель</td>
                        </tr>
                    </table>
    
                </div>
                <div class="ident"><h1>Счёт на оплату № ${order} от ${d.day} ${d.month} ${d.year}г.</h1></div>
                <hr/>
                <div class="recvisits">
                    <table width="100%"  cellspacing="4" class="table1">
                        <tr>
                            <td width="10%">Поставщик<br/>(Исполнитель)</td>
                            <td><b>ООО "Паллада", ИНН 7810859957, КПП 781701001, 196653, Санкт-Петербург <b/><br/><b>Колпино г, Карла маркса ул., дом №13, офис 318, тел.: 2403453<b/></td>
                        </tr>
                        <tr>
                            <td>Покупатель<br/>(Заказчик)</td>
                            <td><b>${customer.name_org}, ИНН ${customer.inn}, КПП ${customer.kpp}, <br/> ${customer.adress}, тел.: ${customer.tel}<b/></td>
                        </tr>
                        <tr>
                            <td>Основание</td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div class="specific">
                    <table width="100%" border="1" cellspacing="0" class="table1">
                        <tr>
                            <th>№</th>
                            <th>Товары(работы, услуги)</th>
                            <th>кол-во</th>
                            <th>Ед.</th>
                            <th>Цена</th>
                            <th>Сумма</th>
                        </tr>
                        ${spec()}	
                    </table>
                </div>
                <div class="summ">
                    <table width="100%" border="0" cellspacing="0" class="table1">
                        <tr>
                            <td></td>
                            <td width="15%" style="text-align:right">Итого:</td>
                            <td width="15%" style="text-align:right"><b>${Sc}<b/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td style="text-align:right">Сумма НДС:</td>
                            <td style="text-align:right"><b>${nds}<b/></td>
                        </tr>
                        <tr >
                            <td ></td>
                            <td style="text-align:right">Всего к оплате:</td>
                            <td style="text-align:right"><b>${all}<b/></td>
                        </tr>
                    </table>
                </div>
                <div class="conditions">Всего наименований 1, на сумму ${all} руб.<br/><b>${all_str}.</b><br/>
                Плановая дата отгрузки товара:<br/>
                Оплатить не позднее 01.02.2021<br/>
                Условия оплаты: 100% предоплата в течении указанного выше срока.<br/>
                При оплате после указанного срока, дата отгрузки будет пересмотрена.<br/> 
                Товар отгружается на условиях самовывоза по адресу:<br/>
                </div>
                <hr/>
                <div class="signature">
                    <table width="100%" border="0" cellspacing="0" class="table2">
                        <tr>
                            <th width="20%">Руководитель</th>
                            <th width="30%" style="border-bottom-style: solid ; text-align:right; border-bottom-width: 1px;">Лешок И. В.</th>
                            <th width="20%">Бухгалтер</th>
                            <th width="30%" style="border-bottom-style: solid ; text-align:right ; border-bottom-width: 1px;">Лешок И. В.</th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </body>
    </html>`;
};
