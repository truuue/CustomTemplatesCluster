"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface RedisStats {
  daily: {
    get: number;
    set: number;
    del: number;
  };
  hourly: {
    get: number;
    set: number;
    del: number;
  };
  limits: {
    daily: number;
    hourly: number;
  };
}

export default function RedisMonitoring() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const [stats, setStats] = useState<RedisStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [sendingAlert, setSendingAlert] = useState(false);
  const { toast } = useToast();

  // Afficher les informations de session pour le débogage
  useEffect(() => {
    console.log("Session:", session);
    console.log("Status:", status);
    console.log("Is Admin:", session?.user?.isAdmin);
  }, [session, status]);

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isAdmin) {
      console.log("Redirection car non admin");
      redirect("/");
    }
  }, [session, status]);

  const fetchStats = async () => {
    if (status !== "authenticated") return;

    try {
      const response = await fetch("/api/admin/redis-stats", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        throw new Error("Erreur lors de la récupération des statistiques");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des stats:", error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les statistiques Redis",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const runTests = async () => {
    if (status !== "authenticated") return;

    setTesting(true);
    try {
      const response = await fetch("/api/admin/redis/test", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Tests réussis",
          description: "Connexion Redis OK",
          duration: 5000,
        });
        // Rafraîchir les stats après le test
        fetchStats();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Erreur lors des tests",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setTesting(false);
    }
  };

  const testEmailAlert = async () => {
    if (status !== "authenticated") return;

    console.log("Début du test d'alerte email");
    setSendingAlert(true);
    try {
      console.log("Envoi de la requête POST à /api/admin/redis/test-alert");
      const response = await fetch("/api/admin/redis/test-alert", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Réponse reçue:", response.status);
      const data = await response.json();
      console.log("Données reçues:", data);

      if (data.success) {
        toast({
          title: "Email envoyé",
          description:
            "Un email d'alerte test a été envoyé à " + session.user.email,
          duration: 5000,
        });
      } else {
        console.error("Erreur dans la réponse:", data);
        throw new Error(data.error || "Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur complète lors du test d'alerte:", error);
      toast({
        title: "Erreur lors de l'envoi",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setSendingAlert(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchStats();
      const interval = setInterval(fetchStats, 60000); // Rafraîchir toutes les minutes
      return () => clearInterval(interval);
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center">
          <div className="text-lg">Chargement des statistiques Redis...</div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center">
          <div className="text-lg text-destructive">
            Erreur lors du chargement des statistiques
          </div>
        </div>
      </div>
    );
  }

  const totalDaily = stats.daily.get + stats.daily.set + stats.daily.del;
  const totalHourly = stats.hourly.get + stats.hourly.set + stats.hourly.del;
  const dailyPercentage = (totalDaily / stats.limits.daily) * 100;
  const hourlyPercentage = (totalHourly / stats.limits.hourly) * 100;

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Monitoring Redis</h1>
        <div className="space-x-4">
          <Button onClick={runTests} disabled={testing} variant="outline">
            {testing ? "Test en cours..." : "Tester la connexion"}
          </Button>
          <Button
            onClick={testEmailAlert}
            disabled={sendingAlert}
            variant="outline"
          >
            {sendingAlert ? "Envoi en cours..." : "Tester l'alerte email"}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Statistiques journalières */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Utilisation Journalière
          </h2>
          <div className="mb-4">
            <div className="mb-2 flex justify-between">
              <span>Total</span>
              <span className="font-mono">
                {totalDaily} / {stats.limits.daily}
              </span>
            </div>
            <Progress
              value={dailyPercentage}
              className={cn(
                "h-2",
                dailyPercentage > 90
                  ? "bg-destructive"
                  : dailyPercentage > 75
                    ? "bg-warning"
                    : ""
              )}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>GET</span>
              <span className="font-mono">{stats.daily.get}</span>
            </div>
            <div className="flex justify-between">
              <span>SET</span>
              <span className="font-mono">{stats.daily.set}</span>
            </div>
            <div className="flex justify-between">
              <span>DEL</span>
              <span className="font-mono">{stats.daily.del}</span>
            </div>
          </div>
        </Card>

        {/* Statistiques horaires */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Utilisation Horaire</h2>
          <div className="mb-4">
            <div className="mb-2 flex justify-between">
              <span>Total</span>
              <span className="font-mono">
                {totalHourly} / {stats.limits.hourly}
              </span>
            </div>
            <Progress
              value={hourlyPercentage}
              className={cn(
                "h-2",
                hourlyPercentage > 90
                  ? "bg-destructive"
                  : hourlyPercentage > 75
                    ? "bg-warning"
                    : ""
              )}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>GET</span>
              <span className="font-mono">{stats.hourly.get}</span>
            </div>
            <div className="flex justify-between">
              <span>SET</span>
              <span className="font-mono">{stats.hourly.set}</span>
            </div>
            <div className="flex justify-between">
              <span>DEL</span>
              <span className="font-mono">{stats.hourly.del}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <p className="text-sm text-muted-foreground">
          Les statistiques sont rafraîchies automatiquement toutes les minutes.
          Limite journalière : {stats.limits.daily} requêtes. Limite horaire :{" "}
          {stats.limits.hourly} requêtes.
        </p>
      </div>
    </div>
  );
}
