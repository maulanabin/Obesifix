# Gunakan Python slim untuk image lebih kecil
FROM python:3.11-slim

# Set working directory
ENV APP_HOME=/app
WORKDIR $APP_HOME

# Copy requirements dulu biar caching build lebih efisien
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip setuptools \
    && pip install --no-cache-dir -r requirements.txt

# Copy source code dan file yang dibutuhkan
COPY . ./    

# Expose port
EXPOSE 8080
ENV PORT=8080
ENV PYTHONUNBUFFERED=1

# Jalankan dengan gunicorn
CMD ["gunicorn", "--bind", ":8080", "--workers", "1", "--threads", "8", "--timeout", "0", "app:app"]
