import React from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../hooks/useSettings";
import { SettingContainer } from "../ui/SettingContainer";
import { Input } from "../ui/Input";

interface NovaBaseUrlProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const NovaBaseUrl: React.FC<NovaBaseUrlProps> = ({
  descriptionMode = "inline",
  grouped = false,
}) => {
  const { t } = useTranslation();
  const { settings, updateSetting, isUpdating } = useSettings();
  const [localValue, setLocalValue] = React.useState(
    (settings as any)?.nova_base_url || "",
  );

  React.useEffect(() => {
    setLocalValue((settings as any)?.nova_base_url || "");
  }, [(settings as any)?.nova_base_url]);

  const handleBlur = () => {
    if (localValue !== (settings as any)?.nova_base_url) {
      updateSetting("nova_base_url" as any, localValue);
    }
  };

  return (
    <SettingContainer
      title={t("settings.advanced.nova_base_url.label")}
      description={t("settings.advanced.nova_base_url.description")}
      descriptionMode={descriptionMode}
      grouped={grouped}
    >
      <Input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        placeholder="https://api.deepgram.com/v1/openai"
        variant="compact"
        disabled={isUpdating("nova_base_url")}
        className="w-full min-w-[320px]"
      />
    </SettingContainer>
  );
};
