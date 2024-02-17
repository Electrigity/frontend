import os

# Path to the directory containing the images
directory_path = '../Images'

# Loop through the files in the directory
for count, filename in enumerate(os.listdir(directory_path), start=1):
    # Check if the file is a regular file and has an image extension
    if os.path.isfile(os.path.join(directory_path, filename)) and filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
        # Construct the new filename
        new_filename = f'image{count}.jpg'
        # Rename the file
        os.rename(os.path.join(directory_path, filename), os.path.join(directory_path, new_filename))
