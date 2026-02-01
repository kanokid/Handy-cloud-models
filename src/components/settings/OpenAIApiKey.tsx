import React from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../hooks/useSettings";
import { SettingContainer } from "../ui/SettingContainer";
import { Input } from "../ui/Input";

interface OpenAIApiKeyProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const OpenAIApiKey: React.FC<OpenAIApiKeyProps> = ({
  descriptionMode = "inline",
  grouped = false,
}) => {
  const { t } = useTranslation();
  const { settings, updateSetting, isUpdating } = useSettings();
  const [localValue, setLocalValue] = React.useState(settings?.openai_api_key || "");

  React.useEffect(() => {
    setLocalValue(settings?.openai_api_key || "");
  }, [settings?.openai_api_key]);

  const handleBlur = () => {
    if (localValue !== settings?.openai_api_key) {
      updateSetting("openai_api_key", localValue);
    }
  };

  return (
    <SettingContainer
      title={t("settings.advanced.openai_api_key.label")}
      description={t("settings.advanced.openai_api_key.description")}
      descriptionMode={descriptionMode}
      grouped={grouped}
    >
      <Input
        type="password"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        placeholder="sk-..."
        variant="compact"
        disabled={isUpdating("openai_api_key")}
        className="w-full min-w-[320px]"
      />
    </SettingContainer>
  );
};
