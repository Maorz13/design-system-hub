import { Badge } from "@/components/ui/badge";

interface LibraryStatusBadgeProps {
  installedVersion: number;
  latestVersion: number;
}

export function LibraryStatusBadge({
  installedVersion,
  latestVersion,
}: LibraryStatusBadgeProps) {
  const isUpToDate = installedVersion >= latestVersion;

  return (
    <Badge variant={isUpToDate ? "secondary" : "destructive"}>
      {isUpToDate ? "Up to date" : `Update available (v${latestVersion})`}
    </Badge>
  );
}
