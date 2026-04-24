# imports
import numpy as np

# start code

allFilesNames = ['Scores_2021', 'Scores_2022.txt', 'Scores_2023.txt', 'Scores_2024.txt', 'Scores_2025.txt', 'Scores_2026.txt']
dataSet = []
# allData = np.empty[50,6]
for i in range(len(allFilesNames)):
    current_file = allFilesNames[i]
    dataSet.append(np.loadtxt(current_file, skiprows=1, dtype="float", usecols=1))
    print(dataSet[i])

# data1 = np.loadtxt('Scores_2021.txt', skiprows=1, dtype="float", usecols=1)
# data2 = np.loadtxt('Scores_2022.txt', skiprows=1, dtype="float", usecols=1)
# data3 = np.loadtxt('Scores_2023.txt', skiprows=1, dtype="float", usecols=1)
# data4 = np.loadtxt('Scores_2024.txt', skiprows=1, dtype="float", usecols=1)
# data5 = np.loadtxt('Scores_2025.txt', skiprows=1, dtype="float", usecols=1)
# data6 = np.loadtxt('Scores_2026.txt', skiprows=1, dtype="float", usecols=1)
# dataSet = [data1, data2, data3, data4, data5, data6]
# print(dataSet)

# allData= np.column_stack((data1, data2, data3, data4, data5, data6))
# print(allData[:, 0])

# for col in range(0,6):
# #     # np.append(allData, data1)
# #     allData.append(col)
#     print(allData[:, col])
# print(allData)

# for i in allData:
#     # mean = np.mean(allData[5])
#     # std = np.std(allData[5])
#     # mean = allData
#     print(allData.mean())
# print(std)
# print(type(allData))


# allData = []
# for file in files:
#     allData.append(np.loadtxt(file))

# Concatenate all at once to get $50 \times 6$
# final_array = np.hstack(allData)





# psuedocode

# take all data files and put into numpyarray
    # Columns [0] to [5] is 2021 to 2026
    # rows are the 50 data points

# calculate average and standard devation and prints

# functions
    # calls def scores_box (box and whisker)
    # calss def scores_hist
    # calls def average_scores (bar plot ave)
