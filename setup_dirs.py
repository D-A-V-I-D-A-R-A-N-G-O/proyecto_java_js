import os
import shutil
import sys

base = r'd:\david\Documents\proyecto_java_js.worktrees\agents-fix-all-and-complete-frontend\frontend'

# Create user section directories
dirs_to_create = [
    os.path.join(base, 'usuario', 'html'),
    os.path.join(base, 'usuario', 'js'),
    os.path.join(base, 'ingreso', 'css')
]

print("Creating directories...")
for d in dirs_to_create:
    try:
        os.makedirs(d, exist_ok=True)
        print(f"✓ Created: {d}")
    except Exception as e:
        print(f"✗ Error creating {d}: {e}")

# Copy files
print("\nCopying user section files...")
copies = [
    (os.path.join(base, 'administrador', 'html', 'user-index.html'), 
     os.path.join(base, 'usuario', 'html', 'index.html')),
    (os.path.join(base, 'administrador', 'html', 'user-libros.html'), 
     os.path.join(base, 'usuario', 'html', 'libros.html')),
    (os.path.join(base, 'administrador', 'html', 'user-mis-prestamos.html'), 
     os.path.join(base, 'usuario', 'html', 'mis-prestamos.html')),
    (os.path.join(base, 'administrador', 'js', 'user-verificacion.js'), 
     os.path.join(base, 'usuario', 'js', 'user-verificacion.js')),
    (os.path.join(base, 'administrador', 'js', 'user-libros.js'), 
     os.path.join(base, 'usuario', 'js', 'user-libros.js')),
    (os.path.join(base, 'administrador', 'js', 'user-prestamos.js'), 
     os.path.join(base, 'usuario', 'js', 'user-prestamos.js')),
    (os.path.join(base, 'administrador', 'css', 'ingreso.css'), 
     os.path.join(base, 'ingreso', 'css', 'ingreso.css')),
]

for src, dst in copies:
    try:
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print(f"✓ Copied: {os.path.basename(src)} → {os.path.relpath(dst, base)}")
        else:
            print(f"✗ Source not found: {src}")
    except Exception as e:
        print(f"✗ Error copying {src}: {e}")

print("\n✓ Setup complete! Frontend is ready to use.")
print("\nNext steps:")
print("1. Ensure the backend API is running on http://localhost:8080")
print("2. Open frontend/ingreso/ingreso.html in a browser")
print("3. Login with your admin or user credentials")

