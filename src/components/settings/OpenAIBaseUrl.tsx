import React from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../hooks/useSettings";
import { SettingContainer } from "../ui/SettingContainer";
import { Input } from "../ui/Input";

interface OpenAIBaseUrlProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const OpenAIBaseUrl: React.FC<OpenAIBaseUrlProps> = ({
  descriptionMode = "inline",
  grouped = false,
}) => {
  const { t } = useTranslation();
  const { settings, updateSetting, isUpdating } = useSettings();
  const [localValue, setLocalValue] = React.useState(
    settings?.openai_base_url || "",
  );

  React.useEffect(() => {
    setLocalValue(settings?.openai_base_url || "");
  }, [settings?.openai_base_url]);

  const handleBlur = () => {
    if (localValue !== settings?.openai_base_url) {
      updateSetting("openai_base_url", localValue);
    }
  };

  return (
    <SettingContainer
      title={t("settings.advanced.openai_base_url.label")}
      description={t("settings.advanced.openai_base_url.description")}
      descriptionMode={descriptionMode}
      grouped={grouped}
    >
      <Input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        placeholder="https://api.openai.com/v1"
        variant="compact"
        disabled={isUpdating("openai_base_url")}
        className="w-full min-w-[320px]"
      />
    </SettingContainer>
  );
};
