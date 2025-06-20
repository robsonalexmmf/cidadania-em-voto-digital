
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, BarChart3, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend
} from "recharts";
import { useState } from "react";

const VotingResults = () => {
  const votingData = [
    { 
      name: "João Silva Santos", 
      favor: 78, 
      contra: 22, 
      totalVotes: 2341,
      trend: "up"
    },
    { 
      name: "Maria Oliveira Costa", 
      favor: 65, 
      contra: 35, 
      totalVotes: 2298,
      trend: "down"
    },
    { 
      name: "Carlos Pereira Lima",
      favor: 82, 
      contra: 18, 
      totalVotes: 2187,
      trend: "up"  
    },
    { 
      name: "Ana Souza Mendes", 
      favor: 71, 
      contra: 29, 
      totalVotes: 2156,
      trend: "up"
    },
    { 
      name: "Pedro Costa Alves", 
      favor: 89, 
      contra: 11, 
      totalVotes: 2321,
      trend: "up"
    },
    { 
      name: "Lucia Santos Rocha", 
      favor: 59, 
      contra: 41, 
      totalVotes: 2089,
      trend: "down"
    },
    { 
      name: "Roberto Lima Silva", 
      favor: 74, 
      contra: 26, 
      totalVotes: 2234,
      trend: "up"
    },
    { 
      name: "Carmen Alves Costa", 
      favor: 68, 
      contra: 32, 
      totalVotes: 2198,
      trend: "down"
    }
  ];

  // Cores institucionais (azul para favor, verde para contra)
  const COLORS = ["#2451B2", "#3CC88B"];

  return (
    // Alterei o fundo para institutional.gray (mais claro)
    <section id="apuracao" className="py-16 bg-institutional-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-institutional-navy">
              Apuração em Tempo Real
            </h2>
            <p className="text-lg text-institutional-blue/80 max-w-3xl mx-auto">
              Acompanhe os resultados da consulta popular sobre cada réu em julgamento.
              Os dados são atualizados automaticamente a cada novo voto registrado.
            </p>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="card-institutional text-center bg-white border-none shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-institutional-blue">
                  17,824
                </CardTitle>
                <CardDescription className="text-institutional-navy/70">Total de Votos</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-institutional text-center bg-institutional-blue/10 border-none shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-institutional-green">
                  73.2%
                </CardTitle>
                <CardDescription className="text-institutional-navy/70">Média Condenação</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-institutional text-center bg-institutional-green/10 border-none shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-institutional-blue">
                  26.8%
                </CardTitle>
                <CardDescription className="text-institutional-navy/70">Média Absolvição</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-institutional text-center bg-institutional-navy/10 border-none shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-institutional-navy">
                  8/8
                </CardTitle>
                <CardDescription className="text-institutional-navy/70">Réus Avaliados</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Tabs for Lista Detalhada / Gráfico Comparativo */}
          <div className="mt-8">
            <Tabs defaultValue="lista" className="">
              <TabsList className="mx-auto flex bg-white p-1 rounded-lg shadow max-w-md justify-center">
                <TabsTrigger value="lista" className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-institutional-blue data-[state=active]:text-white text-institutional-blue">
                  <List className="h-4 w-4 mr-2 inline" />
                  Lista Detalhada
                </TabsTrigger>
                <TabsTrigger value="grafico" className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-institutional-blue data-[state=active]:text-white text-institutional-blue">
                  <BarChart3 className="h-4 w-4 mr-2 inline" />
                  Gráfico Comparativo
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="lista" className="mt-6">
                {/* Individual Results - original list */}
                <div className="space-y-4">
                  {votingData.map((defendant, index) => (
                    <Card key={index} className="card-institutional bg-white border-none shadow transition hover:shadow-xl">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-institutional-blue/30 to-institutional-green/30 rounded-full flex items-center justify-center">
                              <span className="text-base font-bold text-institutional-navy">
                                {defendant.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <CardTitle className="text-lg text-institutional-navy">{defendant.name}</CardTitle>
                              <CardDescription className="flex items-center text-institutional-navy/60">
                                <Users className="h-4 w-4 mr-1" />
                                {defendant.totalVotes.toLocaleString()} votos
                              </CardDescription>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {defendant.trend === "up" ? (
                              <TrendingUp className="h-5 w-5 text-institutional-blue" />
                            ) : (
                              <TrendingDown className="h-5 w-5 text-institutional-green" />
                            )}
                            <Badge 
                              variant={defendant.favor > 50 ? "default" : "secondary"}
                              className={
                                defendant.favor > 50
                                  ? "bg-institutional-blue text-white"
                                  : "bg-institutional-green text-white"
                              }
                            >
                              {defendant.favor > 50 ? "Condenação" : "Absolvição"} em maioria
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-4">
                          {/* Favor da condenação */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-institutional-blue">
                                A favor da condenação
                              </span>
                              <span className="text-sm font-bold text-institutional-blue">
                                {defendant.favor}%
                              </span>
                            </div>
                            <Progress value={defendant.favor} className="h-3 bg-institutional-blue/10" />
                          </div>
                          
                          {/* Contra a condenação */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-institutional-green">
                                Contra a condenação
                              </span>
                              <span className="text-sm font-bold text-institutional-green">
                                {defendant.contra}%
                              </span>
                            </div>
                            <Progress 
                              value={defendant.contra} 
                              className="h-3 bg-institutional-green/10"
                            />
                          </div>
                          
                          {/* Vote counts */}
                          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                            <div className="text-center">
                              <p className="text-lg font-bold text-institutional-blue">
                                {Math.round((defendant.favor / 100) * defendant.totalVotes).toLocaleString()}
                              </p>
                              <p className="text-xs text-institutional-navy/70">Votos pela condenação</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-bold text-institutional-green">
                                {Math.round((defendant.contra / 100) * defendant.totalVotes).toLocaleString()}
                              </p>
                              <p className="text-xs text-institutional-navy/70">Votos pela absolvição</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="grafico" className="mt-6">
                {/* Gráfico comparativo */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-institutional-navy mb-4">
                    Percentual de Condenação e Absolvição (%)
                  </h3>
                  <ResponsiveContainer width="100%" height={420}>
                    <BarChart
                      data={votingData}
                      margin={{ top: 16, right: 20, left: 0, bottom: 20 }}
                    >
                      <XAxis dataKey="name" tickFormatter={name => name.split(' ')[0] + ' ' + name.split(' ')[1][0] + '.'} interval={0} angle={-20} textAnchor="end" height={80} />
                      <YAxis domain={[0, 100]} tickFormatter={t => t + '%'} />
                      <Tooltip formatter={(value: number) => value + '%'} />
                      <Legend />
                      <Bar dataKey="favor" name="Condenação" fill="#2451B2" radius={[8,8,0,0]} />
                      <Bar dataKey="contra" name="Absolvição" fill="#3CC88B" radius={[8,8,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="text-xs text-gray-500 mt-3 text-right">Eixo X: Réus | Eixo Y: Percentual (%)</div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VotingResults;

// O arquivo VotingResults.tsx está ficando muito longo. Recomendo fortemente pedir para refatorá-lo!
