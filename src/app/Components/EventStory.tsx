import { indexof } from "stylis";

export const eventStory = (event: string, numContract: string) => {
  const results = [];
  const regex = /\d+/g;
  const index = event.match(regex);
  const reportspaymentProperty: string[] = ["bank", "payments", "datepayment", "paymentDescription"];
  const reportsReturnPaymentProperty: string[] = ["returnPaymentsbank", "returnPayments", "dateReturnPayment", "returnPaymentDescription"];

  const reportspaymentPropertyName: any = {
    bank: "بانک/شرکاء/صندوق",
    payments: "مبلغ پرداختی/دریافتی",
    datepayment: "تاریخ پرداخت/دریافت",
    paymentDescription: "توضیحات",
  };
  const reportsReturnPaymentPropertyName: any = {
    returnPaymentsbank: "بانک/شرکاء/صندوق",
    returnPayments: "مبلغ برگشت از خرید/فروش",
    dateReturnPayment: "تاریخ برگشت از خرید/فروش",
    returnPaymentDescription: "توضیحات",
  };
  if (event.includes("contract_created")) {
    results.push(`قرارداد شماره  (${numContract}) ،ایجاد شد.`);
  }
  if (event.includes("contract_Customer_Updated")) {
    results.push(`در قرارداد (${numContract})، قسمت طرف قراداد، ویرایش  شد.`);
  }
  if (event.includes("contract_TypeContrac_Updated")) {
    results.push(`در قرارداد (${numContract})، قسمت نوع قراداد، ویرایش  شد.`);
  }
  if (event.includes("contract_NumContract_Updated")) {
    results.push(`در قرارداد (${numContract})، قسمت شماره قراداد، ویرایش  شد.`);
  }
  if (event.includes("contract_DateContract_Updated")) {
    results.push(`در قرارداد (${numContract})، قسمت تاریخ قراداد، ویرایش  شد.`);
  }
  if (event.includes(`ReportDescription_Report[${index?.[0]}]_Updated`)) {
    results.push(`در قرارداد (${numContract})، گزارش (${index && parseInt(index?.[0], 10) + 1})، قسمت شرح و مشخصات ویرایش شد.`);
  }
  if (event.includes(`Presenter_Report[${index?.[0]}]_Updated`)) {
    results.push(`در قرارداد (${numContract})، گزارش (${index && parseInt(index?.[0], 10) + 1})، قسمت مجری ویرایش شد.`);
  }
  if (event.includes(`TotalCost_Report[${index?.[0]}]_Updated`)) {
    results.push(`در قرارداد (${numContract})، گزارش (${index && parseInt(index?.[0], 10) + 1})، قسمت قیمت کل ویرایش شد.`);
  }
  if (event.includes("Report_created")) {
    results.push(`در قرارداد شماره (${numContract}) ,گزارش جدید ایجاد شد.`);
  }
  if (event.includes("Report_deleted")) {
    results.push(`در قرارداد شماره (${numContract}) ،گزارش حذف شد.`);
  }
  if (event.includes(`Report[${index?.[0]}]_ReportPaymen[${index?.[1]}]_Deleted`)) {
    results.push(`در قرارداد شماره (${numContract}) ،گزارش (${index && parseInt(index?.[1], 10) + 1})  گزارش پرداخت(${index && parseInt(index?.[0], 10) + 1})  حذف شد.`);
  }
  if (event.includes(`ReportPaymen[${index?.[0]}]_Report[${index?.[1]}]_Created`)) {
    results.push(`در قرارداد شماره (${numContract}) ،گزارش (${index && parseInt(index?.[1], 10) + 1})  گزارش پرداخت(${index && parseInt(index?.[0], 10) + 1})  ایجاد شد.`);
  }
  if (event.includes(`Report[${index?.[0]}]_ReportReturnPayment[${index?.[1]}]_Deleted`)) {
    results.push(`در قرارداد شماره (${numContract}) ،گزارش (${index && parseInt(index?.[0], 10) + 1})  گزارش برگشت(${index && parseInt(index?.[1], 10) + 1})  حذف شد.`);
  }
  if (event.includes(`Report[${index?.[0]}]_ReportReturnPayment[${index?.[1]}]_Created`)) {
    results.push(`در قرارداد شماره (${numContract}) ،گزارش (${index && parseInt(index?.[0], 10) + 1})  گزارش برگشت(${index && parseInt(index?.[1], 10) + 1})  ایجاد شد.`);
  }
  if (event.includes("_reportspayment")) {
    reportspaymentProperty.map((reportpaymentProperty) => {
      if (event.includes(`Report[${index?.[0]}]_reportspayment[${index?.[1]}]_updated_${reportpaymentProperty}`)) {
        results.push(
          `قراداد شماره (${numContract}) ،گزارش (${index && parseInt(index?.[0], 10) + 1}) ،گزارش پرداخت (${index && parseInt(index?.[1], 10) + 1}) ,در قسمت ${
            reportspaymentPropertyName[reportpaymentProperty]
          } ویرایش شد. `
        );
      }
    });
  }
  if (event.includes("_returnReportspayment")) {
    reportsReturnPaymentProperty.map((reportReturnpaymentProperty) => {
      console.log(reportReturnpaymentProperty.indexOf);

      if (event === `Report[${index?.[0]}]_returnReportspayment[${index?.[1]}]_updated_${reportReturnpaymentProperty}`) {
        // results.push(`${event} ,${reportReturnpaymentProperty}`);
        results.push(
          ` قراداد شماره (${numContract}) ،گزارش (${index && parseInt(index?.[0], 10) + 1}) ،گزارش برگشت ها (${index && parseInt(index?.[1], 10) + 1}) در قسمت ${
            reportsReturnPaymentPropertyName[reportReturnpaymentProperty]
          } ویرایش شد.`
        );
      }
    });
  }

  const ResultItem = results.map((result) => result).flat();

  return ResultItem;
};
