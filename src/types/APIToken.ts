export interface APIToken {
    exp: number;
    id: number;
    perms: permission[];
  }
  
  interface permission {
    id: number;
    name: string;
  }
  