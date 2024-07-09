// 在 constants/childrenData.ts
export interface ChildInfo {
    age: number;
    level: string;
}

export interface ChildrenData {
    [key: string]: ChildInfo;
}

// 5 Music level:
// 1 Beginner Level
// 2 Elementary Level
// 3 Intermediate Level
// 4 Advanced Level
// 5 Expert Level
export const childrenData: ChildrenData = {
    Daniel: { age: 8, level: "Beginner ★☆☆☆☆" },
    Amy: { age: 10, level: "Intermediate ★★★☆☆" },
    Tom: { age: 13, level: "Advanced ★★★★☆" }
};
