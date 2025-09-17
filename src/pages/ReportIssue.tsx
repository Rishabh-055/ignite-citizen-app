import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, MapPin, Upload, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { issueService } from '@/api/services';

export default function ReportIssue() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [gettingLocation, setGettingLocation] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  const categories = [
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'roads', label: 'Roads & Transportation' },
    { value: 'sanitation', label: 'Sanitation & Waste' },
    { value: 'lighting', label: 'Street Lighting' },
    { value: 'parks', label: 'Parks & Recreation' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'safety', label: 'Public Safety' },
    { value: 'other', label: 'Other' },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    setGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In a real app, you'd use a geocoding service to convert coordinates to address
            const { latitude, longitude } = position.coords;
            setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
            
            toast({
              title: "Location captured",
              description: "Your current location has been added to the report.",
            });
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to get your location address.",
              variant: "destructive",
            });
          } finally {
            setGettingLocation(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Location access denied",
            description: "Please enter your location manually or enable location services.",
            variant: "destructive",
          });
          setGettingLocation(false);
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Please enter your location manually.",
        variant: "destructive",
      });
      setGettingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const issueData = {
        ...formData,
        location,
        imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      };

      await issueService.createIssue(issueData);

      toast({
        title: "Issue reported successfully!",
        description: "Thank you for helping improve our community. We'll review your report shortly.",
      });

      // Reset form
      setFormData({ title: '', description: '', category: '' });
      setLocation('');
      setSelectedImage(null);
      setImagePreview(null);
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting issue:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Report an Issue</h1>
          <p className="text-lg text-muted-foreground">
            Help us make your community better by reporting issues that need attention
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <Label htmlFor="image" className="text-base font-medium">
                  Upload Image (Optional)
                </Label>
                <div className="mt-2">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Issue preview"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Click to upload an image</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-base font-medium">
                  Issue Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief description of the issue"
                  className="mt-2"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-base font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide detailed information about the issue"
                  className="mt-2 min-h-[120px]"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-base font-medium">
                  Issue Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  required
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-base font-medium">
                  Location *
                </Label>
                <div className="mt-2 flex space-x-2">
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location or use GPS"
                    className="flex-1"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGetLocation}
                    disabled={gettingLocation}
                    className="px-3"
                  >
                    <MapPin className="h-4 w-4" />
                    {gettingLocation ? '...' : 'GPS'}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit Report
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}