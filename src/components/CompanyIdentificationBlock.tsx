import {
  COMPANY_DOMICILE,
  COMPANY_RUC,
  LEGAL_COMPANY_NAME,
  TRADE_NAME,
} from "@/lib/legal";

export default function CompanyIdentificationBlock() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-800">
      <p>
        <strong>Razón social:</strong> {LEGAL_COMPANY_NAME}
      </p>
      <p className="mt-1">
        <strong>Nombre comercial:</strong> {TRADE_NAME}
      </p>
      <p className="mt-1">
        <strong>RUC:</strong> {COMPANY_RUC}
      </p>
      <p className="mt-1">
        <strong>Domicilio:</strong> {COMPANY_DOMICILE}
      </p>
    </div>
  );
}
