import { useToast } from "@/hooks/use-toast";
import { generateDeploymentZip } from "@/lib/deploy-utils";
import { Template } from "@/types/template";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

interface DeployButtonProps {
  template: Template;
  assets: {
    html: string;
    css: string;
    images: { [key: string]: Buffer };
    scripts?: { [key: string]: string };
  };
}

export function DeployButton({ template, assets }: DeployButtonProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const { toast } = useToast();

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const zip = await generateDeploymentZip(template, assets);
      const response = await fetch(`/api/deploy/${template._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template,
          assets,
          zip: zip.toString("base64"),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      toast({
        title: "Déploiement réussi !",
        description: (
          <div className="mt-2 space-y-2">
            <p>Votre site est en ligne à l&apos;adresse :</p>
            <a
              href={data.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {data.deployUrl}
            </a>
            <p>Pour revendiquer votre site :</p>
            <a
              href={data.claimUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Cliquez ici
            </a>
          </div>
        ),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de déploiement",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Button onClick={handleDeploy} disabled={isDeploying} className="w-full">
      {isDeploying ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Déploiement en cours...
        </>
      ) : (
        "Déployer sur Netlify"
      )}
    </Button>
  );
}
