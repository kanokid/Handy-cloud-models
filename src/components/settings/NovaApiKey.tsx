import React from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../hooks/useSettings";
import { SettingContainer } from "../ui/SettingContainer";
import { Input } from "../ui/Input";

interface NovaApiKeyProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const NovaApiKey: React.FC<NovaApiKeyProps> = ({
  descriptionMode = "inline",
  grouped = false,
}) => {
  const { t } = useTranslation();
  const { settings, updateSetting, isUpdating } = useSettings();
  const [localValue, setLocalValue] = React.useState(
    (settings as any)?.nova_api_key || "",
  );

  React.useEffect(() => {
    setLocalValue((settings as any)?.nova_api_key || "");
  }, [(settings as any)?.nova_api_key]);

  const handleBlur = () => {
    if (localValue !== (settings as any)?.nova_api_key) {
      updateSetting("nova_api_key" as any, localValue);
    }
  };

  return (
    <SettingContainer
      title={t("settings.advanced.nova_api_key.label")}
      description={t("settings.advanced.nova_api_key.description")}
      descriptionMode={descriptionMode}
      grouped={grouped}
    >
      <Input
        type="password"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        placeholder="Enter your Deepgram API Key..."
        variant="compact"
        disabled={isUpdating("nova_api_key")}
        className="w-full min-w-[320px]"
      />
    </SettingContainer>
  );
};
