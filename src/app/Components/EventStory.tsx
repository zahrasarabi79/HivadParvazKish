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
    results.push(`قرارداد شماره  (${numContract}) ,ایجاد شد.`);
  }
  if (event.includes("Report_created")) {
    results.push(`در قرارداد شماره (${numContract}) ,گزارش جدید ایجاد شد.`);
  }
  if (event.includes("Report_deleted")) {
    results.push(`در قرارداد شماره (${numContract}) ,گزارش حذف شد.`);
  }
  if (event.includes(`ReportPayment_Report[${index?.[0]}]_Deleted`)) {
    results.push(`در قرارداد شماره (${numContract}) ,گزارش پرداخت حذف شد.`);
  }
  if (event.includes(`ReportPayment_Report[${index?.[0]}]_Created`)) {
    results.push(`در قرارداد شماره (${numContract}) ,گزارش پرداخت جدید ایجاد شد.`);
  }
  if (event.includes(`ReportReturnPayment_Report[${index?.[0]}]_Deleted`)) {
    results.push(`در قرارداد شماره (${numContract}) ,گزارش بازگشت حذف شد.`);
  }
  if (event.includes(`ReportReturnPayment_Report[${index?.[0]}]_Created`)) {
    results.push(`در قرارداد شماره (${numContract}) ,گزارش بازگشت جدید ایجاد شد.`);
  }
  if (event.includes("_reportspayment")) {
    reportspaymentProperty.map((reportpaymentProperty) => {
      if (event.includes(`Report[${index?.[0]}]_reportspayment[${index?.[1]}]_updated_${reportpaymentProperty}`)) {
        results.push(
          `ویرایش قراداد شماره (${numContract}) ,گزارش (${index && parseInt(index?.[0], 10) + 1}) ,گزارش پرداخت (${index && parseInt(index?.[1], 10) + 1}) ,در قسمت ${
            reportspaymentPropertyName[reportpaymentProperty]
          }`
        );
      }
    });
  }
  if (event.includes("_returnReportspayment")) {
    reportsReturnPaymentProperty.map((reportReturnpaymentProperty) => {
      if (event.includes(`Report[${index?.[0]}]_returnReportspayment[${index?.[1]}]_updated_${reportReturnpaymentProperty}`)) {
        results.push(
          `ویرایش قراداد شماره (${numContract}) " گزارش (${index && parseInt(index?.[0], 10) + 1}) گزارش پرداخت (${index && parseInt(index?.[1], 10) + 1}) در قسمت ${
            reportsReturnPaymentPropertyName[reportReturnpaymentProperty]
          }`
        );
      }
    });
  }

  const ResultItem = results.map((result) => result).flat();

  return ResultItem;
};
