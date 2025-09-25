using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Computer;
using GameRequirements.Common.DTO.Game;
using GameRequirements.Common.Enums;
using GameRequirements.Dal.Core;
using GameRequirements.Domain.Entites.Completing_computers;
using GameRequirements.Domain.Entites.Games;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll.BL
{
    public class PerformanceBL(HardwareRepository hardwareRepository, GamesRepository gamesRepository) : IPerformanceBL
    {
        private double CalculateCpuScore(DBProcessor cpu)
        {
            var avgFreq = (cpu.BaseFrequencyGHz + cpu.BoostFrequencyGHz) / 2;
            return (cpu.Cores * cpu.Threads) * avgFreq;
        }
        private double CalculateGpuScore(DBVideoCard gpu)
        {
            double baseScore = gpu.Cuda_Or_Stream_Cores * gpu.Boost_Clock_MHz * (gpu.VRAM_GB / 4.0);
            double rtBonus = gpu.RT_Units * 50;
            double tensorBonus = gpu.Tensor_Units * 30;

            return baseScore + rtBonus + tensorBonus;
        }
        public async Task<PerformanceLevel> EvaluateAsync(GameDTO game, ComputerDTO computer)
        {
            // Асинхронно получаем железо пользователя
            var cpuTask = hardwareRepository.GetCpuByNameAsync(computer.CpuName);
            var gpuTask = hardwareRepository.GetGpuByNameAsync(computer.GpuName);

            // Асинхронно получаем минимальные и рекомендованные требования игры
            var minCpuTask = hardwareRepository.GetCpuByNameAsync(game.MinCpu);
            var recCpuTask = hardwareRepository.GetCpuByNameAsync(game.RecCpu);
            var minGpuTask = hardwareRepository.GetGpuByNameAsync(game.MinGpu);
            var recGpuTask = hardwareRepository.GetGpuByNameAsync(game.RecGpu);

            await Task.WhenAll(cpuTask, gpuTask, minCpuTask, recCpuTask, minGpuTask, recGpuTask);

            var cpu = cpuTask.Result!;
            var gpu = gpuTask.Result!;
            var minCpu = minCpuTask.Result!;
            var recCpu = recCpuTask.Result!;
            var minGpu = minGpuTask.Result!;
            var recGpu = recGpuTask.Result!;
            int ramGB = computer.RamGB;

            // Логика расчёта уровня
            bool cpuMeetsMin = CalculateCpuScore(cpu) >= CalculateCpuScore(minCpu);
            bool gpuMeetsMin = CalculateGpuScore(gpu) >= CalculateGpuScore(minGpu);
            bool ramMeetsMin = ramGB >= game.MinRamGB;

            bool cpuMeetsRec = CalculateCpuScore(cpu) >= CalculateCpuScore(recCpu);
            bool gpuMeetsRec = CalculateGpuScore(gpu) >= CalculateGpuScore(recGpu);
            bool ramMeetsRec = ramGB >= game.RecRamGB;

            if (!cpuMeetsMin || !gpuMeetsMin || !ramMeetsMin)
                return PerformanceLevel.NotPlayable;

            if (cpuMeetsRec && gpuMeetsRec && ramMeetsRec)
                return PerformanceLevel.High;

            int midCount = 0;
            if (cpuMeetsMin && !cpuMeetsRec) midCount++;
            if (gpuMeetsMin && !gpuMeetsRec) midCount++;
            if (ramMeetsMin && !ramMeetsRec) midCount++;

            if (midCount >= 2)
                return PerformanceLevel.Medium;

            return PerformanceLevel.Low;
        }
        public async Task<Dictionary<string, PerformanceLevel>> EvaluateAllGamesAsync(ComputerDTO computer, int batchSize = 30)
        {
            var result = new Dictionary<string, PerformanceLevel>();

            int skip = 0;
            List<DBGames> gamesBatch;

            do
            {
                // Получаем батч игр через репозиторий
                gamesBatch = await gamesRepository.GetGamesBatchAsync(skip, batchSize);

                foreach (var game in gamesBatch)
                {
                    // Преобразуем DBGames в GameDTO
                    var gameDto = new GameDTO
                    {
                        Name = game.Name,
                        MinCpu = game.MinCpuModel,
                        MinGpu = game.MinGpuModel,
                        MinRamGB = game.MinRamGB,
                        RecCpu = game.RecCpuModel,
                        RecGpu = game.RecGpuModel,
                        RecRamGB = game.RecRamGB
                    };

                    // Вычисляем уровень производительности
                    var level = await EvaluateAsync(gameDto, computer);
                    result.Add(game.Name, level);
                }

                skip += batchSize;

            } while (gamesBatch.Count > 0);

            return result;
        }

    }
}
