
export const removeJsonAnotaionOnString = (s: string | undefined): string => {
    if (s){
        return s.replace(/^```json\s*/, "").replace(/```$/, "");  
    } return "";
}

