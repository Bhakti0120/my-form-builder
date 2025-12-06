// src/utils/storage.ts
export type FormTemplate = {
  id: string;
  title: string;
  config: any;
  createdAt: string;
  updatedAt?: string;
};

export type FormResponse = {
  responseId: string;
  data: Record<string, any>;
  createdAt: string;
  updatedAt?: string;
};

const TEMPLATE_KEY = 'published-forms';
const RESPONSE_KEY = 'form-responses';

export const loadTemplates = (): Record<string, FormTemplate> =>
  JSON.parse(localStorage.getItem(TEMPLATE_KEY) || '{}');

export const saveTemplates = (map: Record<string, FormTemplate>) =>
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(map));

export const saveTemplate = (tpl: FormTemplate) => {
  const all = loadTemplates();
  all[tpl.id] = tpl;
  saveTemplates(all);
};

// ------------------ RESPONSES ------------------

export const loadResponses = (): Record<string, FormResponse[]> =>
  JSON.parse(localStorage.getItem(RESPONSE_KEY) || '{}');

export const saveResponses = (map: Record<string, FormResponse[]>) =>
  localStorage.setItem(RESPONSE_KEY, JSON.stringify(map));

export const saveResponse = (formId: string, response: FormResponse) => {
  const all = loadResponses();
  const arr = all[formId] ?? [];

  const idx = arr.findIndex((r) => r.responseId === response.responseId);

  if (idx >= 0) {
    arr[idx] = {
      ...arr[idx],
      ...response,
      updatedAt: new Date().toISOString(),
    };
  } else {
    arr.push(response);
  }

  all[formId] = arr;
  saveResponses(all);
};

export const deleteResponse = (formId: string, responseId: string) => {
  const all = loadResponses();
  all[formId] = (all[formId] || []).filter((r) => r.responseId !== responseId);
  saveResponses(all);
};
