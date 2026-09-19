export const PREFILL_SERVICE_EVENT = "kc:prefill-service";

/** Заповнює select «Послуга» у формі запису (викликається з карток послуг). */
export function prefillService(title: string) {
  window.dispatchEvent(new CustomEvent(PREFILL_SERVICE_EVENT, { detail: title }));
}
