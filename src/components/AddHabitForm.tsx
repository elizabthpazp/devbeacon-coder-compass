
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddHabitFormProps {
  onAddHabit: (habit: { name: string; icon: string; target: number; unit: string }) => Promise<void>;
}

export const AddHabitForm = ({ onAddHabit }: AddHabitFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('💪');
  const [target, setTarget] = useState(1);
  const [unit, setUnit] = useState('veces');

  const habitIcons = ['💪', '📚', '🏃‍♂️', '💧', '🧘‍♂️', '☕', '🎯', '⚡', '🌱', '🔥'];
  const commonUnits = ['veces', 'minutos', 'horas', 'páginas', 'vasos', 'km'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await onAddHabit({ name, icon, target, unit });
      setName('');
      setIcon('💪');
      setTarget(1);
      setUnit('veces');
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="mb-6 bg-purple-600 hover:bg-purple-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Agregar Hábito
      </Button>
    );
  }

  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Nombre del hábito"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger className="w-16 bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {habitIcons.map((habitIcon) => (
                  <SelectItem key={habitIcon} value={habitIcon}>
                    {habitIcon}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Meta diaria</label>
            <Input
              type="number"
              min="1"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value))}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Unidad</label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {commonUnits.map((unitOption) => (
                  <SelectItem key={unitOption} value={unitOption}>
                    {unitOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Crear Hábito
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};
