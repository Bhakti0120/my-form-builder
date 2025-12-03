import { createContext, ReactNode, useContext, useState } from "react";
import { FormConfig } from "../types/form-types";

interface FormBuilderCtx {
  formConfig: FormConfig;
  updateForm: (data: Partial<FormConfig>) => void;
}

const defaultConfig: FormConfig = {
  formLabel: "",
  viewType: "create",
  sections: [],
};

const FormBuilderContext = createContext<FormBuilderCtx>({
  formConfig: defaultConfig,
  updateForm: () => {},
});

export const FormBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [formConfig, setFormConfig] = useState<FormConfig>(defaultConfig);

  const updateForm = (data: Partial<FormConfig>) => {
    setFormConfig((prev) => ({ ...prev, ...data }));
  };

  return (
    <FormBuilderContext.Provider value={{ formConfig, updateForm }}>
      {children}
    </FormBuilderContext.Provider>
  );
};

export const useFormBuilder = () => useContext(FormBuilderContext);
