
export interface Institution {
  rank: number;
  name: string;
  type: 'Federal' | 'State' | 'Private' | 'Polytechnic';
  jambCutOff: number;
  location: string;
  website: string;
}

export const getTopInstitutions = async (): Promise<Institution[]> => {
  // Simulating an API call to a Nigerian Education Database
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { rank: 1, name: "University of Ibadan (UI)", type: "Federal", jambCutOff: 200, location: "Oyo", website: "ui.edu.ng" },
    { rank: 2, name: "University of Lagos (UNILAG)", type: "Federal", jambCutOff: 200, location: "Lagos", website: "unilag.edu.ng" },
    { rank: 3, name: "Covenant University", type: "Private", jambCutOff: 180, location: "Ogun", website: "covenantuniversity.edu.ng" },
    { rank: 4, name: "University of Nigeria, Nsukka (UNN)", type: "Federal", jambCutOff: 200, location: "Enugu", website: "unn.edu.ng" },
    { rank: 5, name: "Obafemi Awolowo University (OAU)", type: "Federal", jambCutOff: 200, location: "Osun", website: "oauife.edu.ng" },
    { rank: 6, name: "Ahmadu Bello University (ABU)", type: "Federal", jambCutOff: 180, location: "Kaduna", website: "abu.edu.ng" },
    { rank: 7, name: "Federal University of Tech, Akure (FUTA)", type: "Federal", jambCutOff: 180, location: "Ondo", website: "futa.edu.ng" },
    { rank: 8, name: "University of Ilorin (UNILORIN)", type: "Federal", jambCutOff: 180, location: "Kwara", website: "unilorin.edu.ng" },
    { rank: 9, name: "Lagos State University (LASU)", type: "State", jambCutOff: 190, location: "Lagos", website: "lasu.edu.ng" },
    { rank: 10, name: "Yaba College of Technology (YABATECH)", type: "Polytechnic", jambCutOff: 150, location: "Lagos", website: "yabatech.edu.ng" }
  ];
};
