import csv
import random
import math

###########################################
###########   GLOBAL VARS     #############
###########################################
RandomSeed = 1

antonymsCsv = "antonyms book list v2.csv"
extraAntonymsCsv = "extra antonyms.csv"
synonymsCsv = "synsData.csv"

antonymsJSONOutput = "antonyms.json"
synonymsJSONOutput = "synonyms.json"
decoysJSONOutput = "decoys.json"

###########################################
##############   CLASSES    ###############
###########################################

class Question:
    def __init__(self, arr):
        self.question = arr.pop(0)
        self.answer = arr.pop(0)
        self.alternativeAnswers = arr

    def hasOverlap(self, other):
        if(self.question == other.question
           or self.question == other.answer
           or self.answer == other.question
           or self.answer == other.answer):
            return True
        return False

    def writeToJsonFile(self, f):
        f.write("\t{\n")
        f.write("\t\t\"question\": \"" + str(self.question) + "\",\n")
        f.write("\t\t\"answer\": \"" + str(self.answer) + "\",\n")
        f.write("\t\t\"otherAnswers\": " + str(self.alternativeAnswers) + "\n")
        f.write("\t},\n")
        


class App:
    def __init__(self):
        global antonymsCsv
        global extraAntonymsCsv
        global synonymsCsv
        
        global antonymsJSONOutput
        global synonymsJSONOutput
        global decoysJSONOutput
        
        self.antonymsQuestions = []
        self.antonymsExtraQuestions = []
        self.synonymsQuestions = []
        self.decoys = []

        # load curated data
        self.readFromCsv(antonymsCsv)
        self.readFromCsv(synonymsCsv, False, True)
        # load and check uncurated data
        self.readFromCsv(extraAntonymsCsv, True)
        self.checkExtraQuestions()
        #load decoys
        self.readDecoysFromCsv(synonymsCsv)
        self.readDecoysFromCsv(extraAntonymsCsv)
        self.readDecoysFromCsv(antonymsCsv)
            
        self.generateQuestionsJson()
        self.generateDecoysJson()


    def readFromCsv(self, filename, isExtra = False, isSynonyms = False):
        with open(filename, 'r') as file:
             reader = csv.reader(file)
             output = []
             for row in reader:
                 output.append(row)
             for row in output:
                 while("" in row):
                     row.remove("")
                 for idx in range(0, len(row)):
                     row[idx] = row[idx].strip().rstrip()
             random.Random(RandomSeed).shuffle(output)
             if(isSynonyms):
                 while(len(output) > 0):
                       self.synonymsQuestions.append(Question(output.pop(0)))  
             elif(isExtra):
                 while(len(output) > 0):
                     self.antonymsExtraQuestions.append(Question(output.pop(0)))
             else:
                 while(len(output) > 0):
                     self.antonymsQuestions.append(Question(output.pop(0)))

    def checkExtraQuestions(self):
        questionToCheck = 0
        while(len(self.antonymsExtraQuestions) > 0):
             questionToCheck = self.antonymsExtraQuestions.pop(0)
             canInclude = True
             for question in self.antonymsQuestions:
                if(questionToCheck.hasOverlap(question)):
                    canInclude = False
                    break
             if(canInclude):
                 self.antonymsQuestions.append(questionToCheck)

    def readDecoysFromCsv(self, filename, preventDuplicates = True):
        with open(filename, 'r') as file:
             reader = csv.reader(file)
             output = []
             for row in reader:
                 output.append(row)
             flattened = [item for sublist in output for item in sublist]
             while("" in flattened):
                 flattened.remove("")
             for idx in range(0, len(flattened)):
                     flattened[idx] = flattened[idx].strip().rstrip()
             random.Random(RandomSeed).shuffle(flattened)
             self.decoys = self.decoys + flattened
             if(preventDuplicates):
                 self.decoys = list(dict.fromkeys(self.decoys))



    def generateQuestionsJson(self, accesstype='w'):
        with open(antonymsJSONOutput, accesstype) as f:
            f.write("[\n")

            for question in self.antonymsQuestions:
                question.writeToJsonFile(f)

            f.write("]\n")

        with open(synonymsJSONOutput, accesstype) as f:
            f.write("[\n")

            for question in self.synonymsQuestions:
                question.writeToJsonFile(f)

            f.write("]\n")

    def generateDecoysJson(self, accessType='w'):
        with open(decoysJSONOutput, accessType) as f:
            f.write(str(self.decoys))







                    
###########################################
###########   MAIN PROGRAM    #############
###########################################

app = App()        
