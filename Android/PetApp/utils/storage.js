// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pets_data';

// Função para salvar os dados no AsyncStorage
export const savePetData = async (petData) => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    let pets = existingData ? JSON.parse(existingData) : [];
    pets.push(petData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
  } catch (error) {
    console.error('Error saving pet data', error);
  }
};

// Função para carregar os dados de todos os pets
export const loadPetData = async () => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error loading pet data', error);
    return [];
  }
};

// Função para atualizar os dados de um pet
export const updatePetData = async (updatedPetData) => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    let pets = storedData ? JSON.parse(storedData) : [];
    pets = pets.map(pet => pet.nome === updatedPetData.nome ? updatedPetData : pet);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
  } catch (error) {
    console.error('Error updating pet data', error);
  }
};

// Função para excluir um pet
export const deletePetData = async (petName) => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    let pets = storedData ? JSON.parse(storedData) : [];
    pets = pets.filter(pet => pet.nome !== petName);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
  } catch (error) {
    console.error('Error deleting pet data', error);
  }
};
